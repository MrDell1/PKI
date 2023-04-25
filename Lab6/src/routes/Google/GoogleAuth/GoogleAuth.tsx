import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { useNavigate } from "react-router";

export const GoogleAuth = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.oauthGoogle);
  const navigate = useNavigate();
  mutate(window.location.search, {
    onError: () => {
      navigate(paths.signIn);
    },
    onSuccess: () => {
      navigate(paths.resources);
    },
  });

  return <Spinner size="xl" />;
};
