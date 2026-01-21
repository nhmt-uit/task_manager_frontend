import { Navigate, Outlet } from "react-router-dom";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "contexts/AuthContext";

const { Title } = Typography;

const ProtectedRoute = () => {
  const { accessToken, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 48,
                color: "#fff",
              }}
              spin
            />
          }
        />
        <Title
          level={4}
          style={{
            color: "#fff",
            marginTop: 16,
            fontWeight: "300",
          }}
        >
          Loading your workspace...
        </Title>
      </div>
    );
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
