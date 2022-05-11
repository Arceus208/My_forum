import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { PostsDocument, useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/isAuthHook";
import { NavBar } from "../components/navbar/NavBar";
import { SideNav } from "../components/navbar/SideNav";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();

  useIsAuth();

  const [createPostMut, { error }] = useCreatePostMutation();
  return (
    <>
      <NavBar></NavBar>
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Box w={[300, 500, 700, 900]} boxShadow="xl" p={10} h="50vh">
          <Heading pb={10}>Create a post</Heading>
          <Formik
            initialValues={{ text: "", title: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createPostMut({
                variables: values,
                refetchQueries: [
                  { query: PostsDocument, variables: { limit: 10 } },
                ],
              });
              if (response.data?.createPost.errors) {
                setErrors(toErrorMap(response.data.createPost.errors));
                return;
              }
              router.push("/posts");
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Title" name="title"></InputField>
                <InputField label="Text" name="text" textarea></InputField>
                <Button
                  mt={2}
                  colorScheme={"blue"}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
};

export default CreatePost;
