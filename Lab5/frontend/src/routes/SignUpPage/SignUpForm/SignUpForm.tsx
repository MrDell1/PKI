import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useAnonService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ReactElement } from "react";

export const SignUpForm = (): ReactElement => {
  const anonService = useAnonService();
  const { mutate } = useMutation(anonService.signUp);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      mutate(values, {
        onError: (error) => {
          toast({
            title: "Error",
            description: `${error}`,
            status: "error",
          });
        },
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex alignItems="center" flexDir="column" gap="4" w="96">
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="email"
          name="email"
          onChange={formik.handleChange}
          placeholder="Email"
          py="3"
          textColor="white"
          type="email"
          value={formik.values.email}
        />
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="password"
          name="password"
          onChange={formik.handleChange}
          placeholder="Password"
          py="3"
          textColor="white"
          type="password"
          value={formik.values.password}
        />
        <Input
          _placeholder={{ color: "white", opacity: "0.5" }}
          borderRadius="xl"
          h="fit-content"
          id="rePassword"
          name="rePassword"
          onChange={formik.handleChange}
          placeholder="Repeat Password"
          py="3"
          textColor="white"
          type="password"
          value={formik.values.rePassword}
        />
        <Button mt="2" size="md" type="submit" variant="secondary">
          <Text>Sign up</Text>
        </Button>
      </Flex>
    </form>
  );
};
