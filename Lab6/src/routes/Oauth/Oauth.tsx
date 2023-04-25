import { Box } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Oauth = (): ReactElement => {
  const status = useSessionStatus();

  if (status === "auth") {
    return <Navigate replace to={paths.resources} />;
  }
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Oauth;
