import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const ProtectedRoute = () => {
  const { accessToken, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
