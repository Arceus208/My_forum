import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import {
  MeDocument,
  MeQuery,
  PostsDocument,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { NavBar } from "../components/navbar/NavBar";

const Login: React.FC<{}> = ({}) => {
  const { loading, data } = useMeQuery();
  const [loginMut] = useLoginMutation();
  const router = useRouter();

  return (
    <Box
      bgImage={"url('/p4.jpg')"}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100vw"
      h="100vh"
      opacity={0.8}
    >
      <NavBar></NavBar>
      <Wrapper>
        {!loading && !data?.me?.id ? (
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await loginMut({
                variables: values,
                update: (store, { data }) => {
                  if (data?.login.user) {
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: data.login.user,
                      },
                    });
                  }
                },
                refetchQueries: [
                  { query: PostsDocument, variables: { limit: 10 } },
                ],
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  router.push(router.query.next);
                } else {
                  router.push("/posts");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Username" name="username"></InputField>
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                ></InputField>
                <Flex flexDirection={"column"}>
                  <Box mt={2} ml="auto">
                    <NextLink href="/forgot-password">
                      <Link>forgot password?</Link>
                    </NextLink>
                  </Box>
                  <Button
                    type="submit"
                    mt={2}
                    mx="auto"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        ) : (
          <Box>You are already logged in</Box>
        )}
      </Wrapper>
    </Box>
  );
};

export default Login;
