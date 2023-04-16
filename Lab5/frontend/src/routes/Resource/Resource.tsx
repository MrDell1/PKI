import { Box } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const Resource = (): ReactElement => {
  const authService = useAuthService();
  if (authService.role === "user") {
    return <Box>User Resource</Box>;
  }
  if (authService.role === "admin") {
    return <Box>Admin Resource</Box>;
  }
  return <Navigate to={paths.public} />;
};
