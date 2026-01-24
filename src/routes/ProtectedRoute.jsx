import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, redirectTo = "/business/signup" }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  // ❌ login nahi
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // ❌ role allowed nahi
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ sab sahi
  return <Outlet />;
};

export default ProtectedRoute;
