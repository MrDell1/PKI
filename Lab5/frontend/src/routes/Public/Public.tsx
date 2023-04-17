import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function uplodData(): Promise<Response> {
  const response = fetch("http://localhost:3000/resources/public", {
    method: "GET",
  });
  // const result = await response.json();
  return response;
}

const Public = (): ReactElement => {
  const query = useQuery(["publicData"], () =>
    uplodData().then((respone) => respone.json())
  );
  const navigate = useNavigate();
  if (query.status === "error") {
    return <Navigate to={paths.root} />;
  }
  if (query.status === "success") {
    return (
      <Box>
        <Button onClick={() => navigate(paths.root)} size="md">
          Home
        </Button>
        <Heading>{query?.data.user[0].data}</Heading>
      </Box>
    );
  }
  return <Spinner size="xl" />;
};

export default Public;
