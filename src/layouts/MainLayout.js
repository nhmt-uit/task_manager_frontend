import { Outlet } from "react-router-dom";
import Header from "components/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
