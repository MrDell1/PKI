import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link, Navigate } from "react-router-dom";
import lp from "./assets/lp.jpg";

const LandingPage = (): ReactElement => {
  const status = useSessionStatus();
  if (status === "auth") {
    return <Navigate replace to={paths.public} />;
  }
  return (
    <Flex
      bgImage={lp}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="100vh"
      justifyContent="space-between"
      px="8"
      py="4"
      w="full"
    >
      <Flex flexDir="row" gap="16" textColor="light.100">
        <Heading>JWT Token</Heading>
      </Flex>
      <Flex
        alignItems="center"
        flexDir="column"
        gap="8"
        justifyContent="center"
        maxW="464px"
        mr="32"
      >
        <Box>
          <Heading fontSize="7xl" textColor="white">
            Check out JWT Tokens
          </Heading>
          <Link to={paths.public}>
            <Text
              _hover={{ color: "light.100" }}
              fontSize="3xl"
              fontWeight="semibold"
              textColor="white"
            >
              or Public resources
            </Text>
          </Link>
        </Box>
        <Flex justifyContent="space-between" w="full">
          <Link to={paths.signIn}>
            <Button>Sign in</Button>
          </Link>
          <Link to={paths.signUp}>
            <Button>Sign up</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default LandingPage;
