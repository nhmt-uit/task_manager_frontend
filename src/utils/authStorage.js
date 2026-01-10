import { authService } from "services/auth.service";

export const logout = async () => {
  await authService.logout({
    refreshToken: localStorage.getItem("refreshToken"),
  });
  localStorage.clear();
  window.location.href = "/login";
};
