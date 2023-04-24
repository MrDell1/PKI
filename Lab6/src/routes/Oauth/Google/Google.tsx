import { Spinner } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router";

const Google = (): ReactElement => {
  const anonService = useAnonService();
  const query = useQuery(
    ["oauthGoogle"],
    anonService.oauthGoogle(window.location.search)
  );
  // const [queryParameters] = useSearchParams();
  // console.log(
  //   queryParameters.get("code"),
  //   queryParameters.get("scope"),
  //   queryParameters.get("authuser")
  // );
  const queryParameters = new URLSearchParams(window.location);
  console.log(window.location.search);
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
export default Google;
