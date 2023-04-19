import { Button, Flex } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const TopBar = (): ReactElement => {
  const authService = useAuthService();
  const navigate = useNavigate();
  return (
    <Flex gap="4" p="8">
      <Button onClick={() => navigate(paths.root)} size="md">
        Home
      </Button>
      <Button onClick={() => authService.signOut()} size="md">
        Sign Out
      </Button>
    </Flex>
  );
};
