import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "pages/Login";
import Register from "pages/Register";
import TaskPage from "pages/TaskPage";
import UserPage from "./pages/UserPage";

import ProtectedRoute from "routes/ProtectedRoute";
import RoleRoute from "routes/RoleRoute";

import MainLayout from "layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/tasks" element={<TaskPage />} />

            <Route element={<RoleRoute allowRoles={["admin"]} />}>
              <Route path="/users" element={<UserPage />} />
            </Route>
            {/* More routes */}
          </Route>
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
