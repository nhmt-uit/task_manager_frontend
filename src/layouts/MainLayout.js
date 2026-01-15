import { Layout, Menu } from "antd";
import { UnorderedListOutlined, TeamOutlined,  LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider>
        <div style={{ color: "#fff", padding: 16, fontWeight: "bold" }}>
          Task Manager
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => {
            if (key === "logout") logout();
            else navigate(key);
          }}
          items={[
            {
              key: "/tasks",
              icon: <UnorderedListOutlined />,
              label: "Tasks",
            },
            {
              key: "/users",
              icon: <TeamOutlined />,
              label: "Users",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        <Header style={{ background: "#fff" }} />
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
