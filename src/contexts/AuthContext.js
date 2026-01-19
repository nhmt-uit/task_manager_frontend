import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setAccessToken(storedToken);
    setLoading(false);
  }, []);

  const login = ({ user, accessToken, refreshToken }) => {
    setUser(user);
    setAccessToken(accessToken);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = async () => {
    await authService.logout({
      refreshToken: localStorage.getItem("refreshToken"),
    });
    setUser(null);
    setAccessToken(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
