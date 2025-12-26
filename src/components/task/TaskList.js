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
} from "antd";
import EditTaskModal from "./EditTaskModal";

import { useEffect, useState } from "react";
import { taskService } from "services/task.service";

const STATUS_FLOW = ["todo", "doing", "done"];

const TaskList = ({ reload }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState();
  const [keyword, setKeyword] = useState();

  const [editingTask, setEditingTask] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
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
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, keyword, reload]);

  const getNextStatus = (current) => {
    const index = STATUS_FLOW.indexOf(current);
    return STATUS_FLOW[(index + 1) % STATUS_FLOW.length];
  };

  // const updateStatus = async (task) => {
  //   const nextStatus = getNextStatus(task.status);
  //   try {
  //     setUpdatingId(task._id);
  //     await taskService.updateStatus(task._id, nextStatus);
  //     message.success(`Moved to ${nextStatus}`);
  //     fetchTasks();
  //   } catch {
  //     message.error("Update failed");
  //   } finally {
  //     setUpdatingId(null);
  //   }
  // };

  // Update UI first, call api later
  const updateStatus = async (task) => {
    const nextStatus = getNextStatus(task.status);

    // backup state
    const oldTasks = [...tasks];

    // optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
    );

    try {
      await taskService.updateStatus(task._id, nextStatus);
      message.success(`Moved to ${nextStatus}`);
    } catch {
      setTasks(oldTasks);
      message.error("Update failed, rollback");
    }
  };

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
              opacity: updatingId === record._id ? 0.5 : 1,
            }}
            onClick={() => {
              if (!loading && !updatingId) updateStatus(record);
            }}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
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
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder="Filter status"
          onChange={setStatus}
          style={{ width: 140 }}
          options={[
            { value: "todo", label: "Todo" },
            { value: "doing", label: "Doing" },
            { value: "done", label: "Done" },
          ]}
        />

        <Input.Search
          placeholder="Search title"
          onSearch={setKeyword}
          allowClear
        />
      </Space>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}
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
      />
      {editingTask && (
        <EditTaskModal
          open={!!editingTask}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSuccess={fetchTasks}
        />
      )}
    </>
  );
};

export default TaskList;
