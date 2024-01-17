import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";
import { hasRoles } from "../utils/user";
import { UserRoles } from "../models/user";

interface RequireAuthProps {
  roles?: UserRoles[];
}

export default function RequireAuth({ roles }: RequireAuthProps) {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const hasRole = hasRoles(user, roles);
  if (!hasRole) {
    toast.error("Not authorized to access this area.");

    return <Navigate to="/catalog" />;
  }

  return <Outlet />;
}
