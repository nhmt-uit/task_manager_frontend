// pages/users/UserTable.jsx
import { Table, Tag, Button, Space, Popconfirm, message } from "antd";
import { useAuth } from "contexts/AuthContext";
import { userService } from "services/user.service";

export default function UserTable({ data, loading, onUserUpdate, onEditUser }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      message.success("User deleted successfully");
      onUserUpdate(); // Refresh the user list
    } catch (error) {
      message.error("Failed to delete user");
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (userData) => {
    onEditUser(userData);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) =>
        role === "admin" ? <Tag color="red">Admin</Tag> : <Tag>User</Tag>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (v) =>
        v ? <Tag color="green">Active</Tag> : <Tag>Inactive</Tag>,
    },
    ...(isAdmin ? [{
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this user?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    }] : []),
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{ x: "max-content" }}
      responsive
    />
  );
}
