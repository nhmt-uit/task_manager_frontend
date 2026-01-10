import api from "./api";

export const authService = {
  login(data) {
    return api.post("/auth/login", data);
  },

  logout(data) {
    return api.post("/auth/logout", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  refreshToken(data) {
    return api.post("/auth/refresh-token", data);
  },
};
