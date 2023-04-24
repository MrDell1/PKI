import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignInForm } from "./SignInForm/SignInForm";

const SignInPage = (): ReactElement => {
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
        <Flex
          alignItems="center"
          color="white"
          flexDir="column"
          gap="8"
          maxW="96"
        >
          <Heading textAlign="center">Create your free account</Heading>
          <Text fontSize="2xl" fontWeight="medium" textAlign="center">
            Start generating your Fashionable outfits with Ai
          </Text>
          <Link to={paths.signUp}>
            <Button size="md" variant="primary">
              Sign up
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
            Login to your account
          </Text>
          <SignInForm />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInPage;