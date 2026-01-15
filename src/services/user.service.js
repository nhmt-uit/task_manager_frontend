import api from "./api";

export const userService = {
  getUsers(params) {
    return api.get("/users", { params });
  },

  createUser(data) {
    return api.post("/users", data);
  },

  updateUser(id, data) {
    return api.put(`/users/${id}`, data);
  },

  deleteUser(id) {
    return api.delete(`/users/${id}`);
  },
};
