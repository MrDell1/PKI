import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";

export const Google = (): ReactElement => {
  const anonService = useAnonService();
  const query = useQuery(["oauthGoogle"], anonService.oauthGoogle);

  if (
    query.status === "error" &&
    query.error instanceof Error &&
    query.error.message === "jwt expired"
  ) {
    return <Navigate to={paths.signIn} />;
  }
  if (query.status === "success") {
    return <Navigate to={paths.resources} />;
  }
  return <Spinner size="xl" />;
};
