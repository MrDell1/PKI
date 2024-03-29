import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignUpForm } from "./SignUpForm/SignUpForm";

const SignUpPage = (): ReactElement => {
  const status = useSessionStatus();

  if (status === "auth") {
    return <Navigate replace to={paths.resources} />;
  }

  return (
    <Flex
      bgGradient="linear-gradient(270deg, #71194C 0%, #1E1E1E 77.6%)"
      flexDir="column"
      h="100vh"
      px="8"
      py="4"
      w="full"
    >
      <Flex flexDir="column" textColor="light.100">
        <Link to={paths.root}>
          <Heading>JWT Token</Heading>
        </Link>
      </Flex>

      <Flex alignItems="center" h="full" justifyContent="space-between" px="16">
        <Flex alignItems="center" color="white" flexDir="column" gap="8" w="96">
          <Heading>Welcome back!</Heading>
          <Text fontSize="2xl" fontWeight="medium">
            Login to generate new outfit
          </Text>
          <Link to={paths.signIn}>
            <Button size="md" variant="primary">
              Sign in
            </Button>
          </Link>
        </Flex>
        <Flex
          alignItems="center"
          flexDir="column"
          gap="8"
          justifyContent="center"
          textAlign="center"
          textColor="white"
          w="60%"
        >
          <Text fontSize="3xl" fontWeight="semibold" maxW="96">
            Create your account
          </Text>
          <SignUpForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
