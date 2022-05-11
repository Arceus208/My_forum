import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/navbar/NavBar";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const forgotPassword: React.FC<{}> = ({}) => {
  const [forgotPasswordMut] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <Wrapper>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            if (values.email.length === 0) {
              setErrors({ email: "Please enter your email" });
              return;
            }

            await forgotPasswordMut({
              variables: values,
            });

            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>We sent an reset password link to your email</Box>
            ) : (
              <Form>
                <InputField
                  label="Enter your email here:"
                  name="email"
                  type="email"
                ></InputField>
                <Button
                  type="submit"
                  mt={2}
                  mx="auto"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </>
  );
};

export default forgotPassword;
