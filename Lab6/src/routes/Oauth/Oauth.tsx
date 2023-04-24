import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Oauth = (): ReactElement => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Oauth;
