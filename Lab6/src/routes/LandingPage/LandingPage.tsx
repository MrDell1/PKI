import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { getGithubUrl } from "@utils/getGithubUrl";
import { getGoogleUrl } from "@utils/getGoogleUrl";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import lp from "./assets/lp.jpg";
import { useSessionStatus } from "@services/SessionService";

const LandingPage = (): ReactElement => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || "/";
  const status = useSessionStatus();
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
        {status === "anon" ? 
       ( <><Flex justifyContent="space-between" w="full">
          <Link to={paths.signIn}>
            <Button>Sign in</Button>
          </Link>
          <Link to={paths.signUp}>
            <Button>Sign up</Button>
          </Link>
        </Flex>
        
        <Flex alignItems="center" w="full">
          <Divider orientation="horizontal" />
          <Text color="white" fontSize="sm" px="3">
            OR
          </Text>
          <Divider orientation="horizontal" />
        </Flex>
        <Flex gap="4" justifyContent="center" w="full">
          <Link to={getGoogleUrl(from)}>
            <Button bg="red.600" size="md">
              Google
            </Button>
          </Link>
          <Link to={getGithubUrl()}>
            <Button bg="gray.700" size="md">
              GitHub
            </Button>
          </Link>
        </Flex></>)
        :
        <Link to={paths.resources}>
            <Button>Resources</Button>
          </Link>
        }
      </Flex>
    </Flex>
  );
};
export default LandingPage;
