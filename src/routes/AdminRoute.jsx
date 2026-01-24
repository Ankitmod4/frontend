import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  // login nahi
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // login hai par admin nahi
  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // sab sahi → admin page dikhao
  return <Outlet />;
};

export default AdminRoute;
