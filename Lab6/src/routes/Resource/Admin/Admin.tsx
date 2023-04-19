import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Activate } from "./Activate/Activate";
import { Deactivate } from "./Deactivate/Deactivate";

export const Admin = (): ReactElement => {
  const authService = useAuthService();
  const query = useQuery(["adminData"], () =>
    authService
      .fetcher("http://localhost:3000/resources/admin", { method: "GET" })
      .then((response) => response.json())
  );

  if (
    query.status === "error" &&
    query.error instanceof Error &&
    query.error.message === "jwt expired"
  ) {
    authService.signOut();
    return <Navigate to={paths.signIn} />;
  }
  if (query.status === "success") {
    console.log(query.data.users);
    return (
      <Box m="auto">
        <Heading>{query?.data.user[0].data}</Heading>
        <Flex flexDir="column" px="64">
          <Flex
            alignItems="center"
            fontSize="2xl"
            fontWeight="semibold"
            gap="8"
            justifyContent="space-between"
            p="4"
            textAlign="center"
            w="full"
          >
            <Text>Username</Text>
            <Text minW="44">Email</Text>
            <Text>Role</Text>
            <Text>Activate/Deactivate</Text>
          </Flex>
          {query?.data.users.map((value: {username:string, idusers: string, email: string, role: string, isActive: number}, key: number) => {
            return (
              <Flex
                alignItems="center"
                fontSize="2xl"
                justifyContent="space-between"
                key={key}
                py="3"
                textAlign="center"
                w="full"
              >
                <Text minW="24">{value.username}</Text>
                <Text>{value.email}</Text>
                <Text>{value.role}</Text>
                <Button size="sm">
                  {value.isActive === 1 ? (
                    <Deactivate id={value.idusers} />
                  ) : (
                    <Activate id={value.idusers} />
                  )}
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    );
  }
  return <Spinner size="xl" />;
};
