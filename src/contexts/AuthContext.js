import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setToken(data.accessToken);
  };

  const logout = async () => {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    await authService.logout({
      refreshToken: localStorage.getItem("refreshToken"),
    });
    setToken(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
