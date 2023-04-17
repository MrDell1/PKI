import { useAuthService } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Admin } from "./Admin/Admin";
import { User } from "./User/User";

export const Resource = (): ReactElement => {
  const authService = useAuthService();
  if (authService.role === "user") {
    return <User />;
  }
  if (authService.role === "admin") {
    return <Admin />;
  }
  return <Navigate to={paths.public} />;
};
