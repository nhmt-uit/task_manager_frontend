import React, { useEffect, useState } from "react";
import { taskService } from "../services/task.service";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  const fetchTasks = async () => {
    const res = await taskService.getTasks({
      page,
      limit: 5,
      status: statusFilter,
      keyword,
    });

    setTasks(res.data.data);
    setTotalPages(res.data.pagination.totalPages);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, keyword]);

  const handleStatusChange = async (id, newStatus) => {
    await taskService.updateStatus(id, { status: newStatus });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this task?")) {
      await taskService.deleteTask(id);
      fetchTasks();
    }
  };

  return (
    <div>
      <h2>Task List</h2>

      <input
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => handleStatusChange(task._id, "done")}>
              Mark Done
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
