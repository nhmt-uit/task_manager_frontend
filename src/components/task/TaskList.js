import {
  Table,
  Select,
  Input,
  Space,
  Tag,
  Button,
  Popconfirm,
  message,
} from "antd";
import EditTaskModal from "./EditTaskModal";

import { useEffect, useState } from "react";
import { taskService } from "services/task.service";

const TaskList = ({ reload }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState();
  const [keyword, setKeyword] = useState();

  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await taskService.getTasks({
      page,
      limit: 5,
      status,
      keyword,
    });
    setTasks(res.data.data);
    setTotal(res.data.pagination.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, status, keyword, reload]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => (
        <Tag color={s === "done" ? "green" : s === "doing" ? "blue" : "gray"}>
          {s.toUpperCase()}
        </Tag>
      ),
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

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={tasks}
        loading={loading}
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
