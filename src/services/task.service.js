import api from "./api";

export const taskService = {
  getTasks(params) {
    return api.get("/tasks", { params });
  },

  createTask(data) {
    return api.post("/tasks", data);
  },

  updateTask(id, data) {
    return api.put(`/tasks/${id}`, data);
  },

  updateStatus(id, status) {
    return api.patch(`/tasks/${id}/status`, { status });
  },

  deleteTask(id) {
    return api.delete(`/tasks/${id}`);
  },
};
