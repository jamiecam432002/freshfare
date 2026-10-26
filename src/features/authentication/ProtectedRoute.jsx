import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export default function ProtectedRoute() {
  const location = useLocation();

  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <p>Loading FreshFare...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
