import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";

export const Google = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.oauthGoogle);

  mutate(window.location.search, {
    onError: () => {
      return <Navigate replace to={paths.signIn} />;
    },
    onSuccess: () => {
      return <Navigate replace to={paths.resources} />;
    },
  });

  return <Spinner size="xl" />;
};
