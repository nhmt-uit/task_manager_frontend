// pages/users/UserTable.jsx
import { Table, Tag } from "antd";

export default function UserTable({ data, loading }) {
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
  ];

  return (
    <Table rowKey="_id" columns={columns} dataSource={data} loading={loading} />
  );
}
