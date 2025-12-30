import api from "./api";

export const authService = {
  login(data) {
    return api.post("/users/login", data);
  },

  register(data) {
    return api.post("/users/register", data);
  },
};
