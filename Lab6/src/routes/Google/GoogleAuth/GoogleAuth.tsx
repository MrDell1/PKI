import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";

export const GoogleAuth = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.oauthGoogle);

  mutate(window.location.search, {
    onError: () => {
      return <Navigate replace to={paths.signIn} />;
    },
  });

  return <Spinner size="xl" />;
};
