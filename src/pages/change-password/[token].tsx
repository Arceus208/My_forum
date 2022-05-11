import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
import { NavBar } from "../../components/navbar/NavBar";
import { useRouter } from "next/router";

interface ChangePasswordProps {
  token: string;
}

const ChangePassword: NextPage<ChangePasswordProps> = () => {
  const router = useRouter();
  const [changePasswordMut] = useChangePasswordMutation();
  const [complete, setComplete] = useState(false);
  const [tokenError, setTokenError] = useState("");
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePasswordMut({
              variables: {
                ...values,
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : "",
              },
            });
            if (response.data?.changePassword.errors) {
              const errorObject = toErrorMap(
                response.data?.changePassword.errors
              );
              if ("token" in errorObject) {
                setTokenError(errorObject.token);
              }
              setErrors(errorObject);
              return;
            }
            if (response.data?.changePassword.user) {
              setComplete(true);
            }
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <>
                <Box>Password reset success</Box>
                <NextLink href="/login">
                  <Link>to login page</Link>
                </NextLink>
              </>
            ) : (
              <Form>
                <InputField
                  label=" New password"
                  name="password"
                  type="password"
                  placeholder="new password"
                ></InputField>
                {tokenError ? (
                  <Flex flexDirection={"column"}>
                    <Box textColor={"red"}>{tokenError}</Box>

                    <NextLink href="/forgot-password">
                      <Link>get new reset password link</Link>
                    </NextLink>
                  </Flex>
                ) : null}
                <Button
                  type="submit"
                  mt={2}
                  mx="auto"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Change password
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </>
  );
};

export default ChangePassword;
