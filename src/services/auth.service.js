import api from "./api";

export const authService = {
  login(data) {
    return api.post("/users/login", data);
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};
