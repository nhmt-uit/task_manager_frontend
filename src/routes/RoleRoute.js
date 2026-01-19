import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const RoleRoute = ({ allowRoles }) => {
  const { user } = useAuth();

  if (!allowRoles.includes(user.role)) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
