import {
  Table,
  Select,
  Input,
  Space,
  Tag,
  Button,
  Popconfirm,
  Empty,
  Alert,
  message,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import EditTaskModal from "./EditTaskModal";

import { useEffect, useState, useCallback } from "react";
import { taskService } from "services/task.service";
import { userService } from "services/user.service";
import { useAuth } from "contexts/AuthContext";

const STATUS_FLOW = ["todo", "doing", "done"];

const TaskList = ({ reload }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState();
  const [keyword, setKeyword] = useState();
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
  
      const res = await taskService.getTasks({
        page,
        limit: 5,
        status,
        keyword,
      });
  
      setTasks(res.data.data);
      setTotal(res.data.pagination.total);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [page, status, keyword]);

  const fetchUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const res = await userService.getUsers({ limit: 100 }); // Get all users for assignment
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchTasks();
    if (isAdmin) {
      fetchUsers();
    }
  }, [fetchTasks, reload, fetchUsers, isAdmin]);

  const getNextStatus = (current) => {
    const index = STATUS_FLOW.indexOf(current);
    return STATUS_FLOW[(index + 1) % STATUS_FLOW.length];
  };

  // Update UI first, call api later
  const updateStatus = useCallback(async (task) => {
    const nextStatus = getNextStatus(task.status);
    const oldTasks = [...tasks];
  
    setTasks(prev =>
      prev.map(t =>
        t._id === task._id ? { ...t, status: nextStatus } : t
      )
    );
  
    try {
      await taskService.updateStatus(task._id, nextStatus);
      message.success(`Moved to ${nextStatus}`);
    } catch {
      setTasks(oldTasks);
      message.error("Update failed, rollback");
    }
  }, [tasks]);

  const assignTask = useCallback(async (taskId, assignedTo) => {
    try {
      await taskService.assignTask(taskId, assignedTo);
      message.success(assignedTo ? "Task assigned successfully" : "Task unassigned successfully");

      // Update the local state optimistically
      setTasks(prev =>
        prev.map(task =>
          task._id === taskId
            ? {
                ...task,
                assignedTo: assignedTo ? users.find(u => u._id === assignedTo) : null
              }
            : task
        )
      );
    } catch (error) {
      message.error("Failed to assign task");
      console.error("Assignment error:", error);
    }
  }, [users]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => {
        const color =
          status === "done" ? "green" : status === "doing" ? "blue" : "gray";

        return (
          <Tag
            color={color}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              if (!loading) updateStatus(record);
            }}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      render: (assignedTo, record) => {
        if (!isAdmin) {
          // For non-admin users, just show the assigned user name
          return assignedTo ? (
            <Tag color="blue">{assignedTo.name}</Tag>
          ) : (
            <Tag>Unassigned</Tag>
          );
        }

        // For admins, show a dropdown to assign/unassign
        return (
          <Select
            placeholder="Assign to..."
            allowClear
            style={{ minWidth: 120 }}
            value={assignedTo?._id || undefined}
            onChange={(value) => assignTask(record._id, value)}
            options={[
              ...users
                .filter(u => u.role === "member") // Only allow assigning to members
                .map(user => ({
                  value: user._id,
                  label: user.name,
                })),
            ]}
          />
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        // Show edit/delete buttons if user is admin, creator;
        const canEdit = isAdmin || record.createdBy === user._id;

        if (!canEdit) {
          return null; // Don't show action buttons
        }

        return (
          <Space>
            <Button size="small" onClick={() => setEditingTask(record)}>
              Edit
            </Button>

            <Popconfirm
              title="Delete this task?"
              onConfirm={async () => {
                await taskService.deleteTask(record._id);
                message.success("Deleted");
                fetchTasks();
              }}
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // Calculate task statistics
  const taskStats = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: "8px" }}>
      {/* Statistics Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card size="small" style={{ borderRadius: "8px", height: "100%" }}>
            <Statistic
              title={
                <Space>
                  <ExclamationCircleOutlined style={{ color: "#8c8c8c" }} />
                  <span>To Do</span>
                </Space>
              }
              value={taskStats.todo || 0}
              valueStyle={{ color: "#8c8c8c", fontSize: "16px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card size="small" style={{ borderRadius: "8px", height: "100%" }}>
            <Statistic
              title={
                <Space>
                  <ClockCircleOutlined style={{ color: "#1890ff" }} />
                  <span>In Progress</span>
                </Space>
              }
              value={taskStats.doing || 0}
              valueStyle={{ color: "#1890ff", fontSize: "16px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card size="small" style={{ borderRadius: "8px", height: "100%" }}>
            <Statistic
              title={
                <Space>
                  <CheckCircleOutlined style={{ color: "#52c41a" }} />
                  <span>Completed</span>
                </Space>
              }
              value={taskStats.done || 0}
              valueStyle={{ color: "#52c41a", fontSize: "16px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6}>
          <Card size="small" style={{ borderRadius: "8px", height: "100%" }}>
            <Statistic
              title={
                <Space>
                  <UserOutlined style={{ color: "#722ed1" }} />
                  <span>Total Tasks</span>
                </Space>
              }
              value={tasks.length}
              valueStyle={{ color: "#722ed1", fontSize: "16px" }}
            />
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: "16px 0 24px 0" }} />

      {/* Search and Filter Section */}
      <Card
        size="small"
        style={{
          marginBottom: "24px",
          borderRadius: "8px",
          border: "1px solid #f0f0f0"
        }}
      >
        <Row gutter={8} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <Space>
              <FilterOutlined style={{ color: "#1890ff" }} />
              <Typography.Text strong>Filter by Status:</Typography.Text>
            </Space>
            <Select
              allowClear
              placeholder="All statuses"
              onChange={setStatus}
              value={status}
              style={{
                width: "100%",
                marginTop: "6px",
                borderRadius: "6px"
              }}
              options={[
                {
                  value: "todo",
                  label: (
                    <Space>
                      <span style={{ color: "#8c8c8c" }}>●</span>
                      To Do
                    </Space>
                  )
                },
                {
                  value: "doing",
                  label: (
                    <Space>
                      <span style={{ color: "#1890ff" }}>●</span>
                      In Progress
                    </Space>
                  )
                },
                {
                  value: "done",
                  label: (
                    <Space>
                      <span style={{ color: "#52c41a" }}>●</span>
                      Completed
                    </Space>
                  )
                },
              ]}
            />
          </Col>

          <Col xs={24} sm={12} lg={16}>
            <Space>
              <SearchOutlined style={{ color: "#1890ff" }} />
              <Typography.Text strong>Search Tasks:</Typography.Text>
            </Space>
            <Input.Search
              placeholder="Search by task title..."
              onSearch={setKeyword}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              allowClear
              style={{
                marginTop: "6px",
                borderRadius: "6px"
              }}
            />
          </Col>
        </Row>
      </Card>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}
      <div style={{ overflowX: "auto" }}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={tasks}
          loading={loading}
          locale={{
            emptyText: loading ? null : <Empty description="No tasks found" />,
          }}
          pagination={{
            current: page,
            total,
            pageSize: 5,
            onChange: setPage,
          }}
          scroll={{ x: "max-content" }}
          responsive
        />
      </div>
      {editingTask && (
        <EditTaskModal
          open={!!editingTask}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSuccess={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskList;
