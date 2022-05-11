import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { UploadFile } from "../components/UploadFile";
import { NavBar } from "../components/navbar/NavBar";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [registerMut] = useRegisterMutation();
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
        <Formik
          initialValues={{ username: "", password: "", email: "", file: null }}
          onSubmit={async (values, { setErrors }) => {
            const response = await registerMut({ variables: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/posts");
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField label="Username" name="username"></InputField>
              <InputField label="Email" name="email"></InputField>
              <InputField
                label="Password"
                name="password"
                type="password"
              ></InputField>
              <UploadFile
                label="Profile Picture"
                name="file"
                setField={setFieldValue}
                isProfile
              ></UploadFile>
              <Button
                type="submit"
                mt={2}
                mx="auto"
                colorScheme="blue"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default Register;
