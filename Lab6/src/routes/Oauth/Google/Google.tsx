import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";

const Google = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.oauthGoogle);

  mutate(window.location.search, {
    onError: () => {
      return <Navigate to={paths.signIn} />;
    },
    onSuccess: () => {
      return <Navigate to={paths.resources} />;
    },
  });

  return <Spinner size="xl" />;
};
export default Google;
