import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import { MENU_ITEMS } from "config/menu";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const filteredMenu = MENU_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

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
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            if (key === "logout") logout();
            else navigate(key);
          }}
          items={filteredMenu}
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
