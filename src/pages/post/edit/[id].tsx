import React from "react";
import { useRouter } from "next/router";
import { useIsAuth } from "../../../utils/isAuthHook";
import {
  PostDocument,
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

import { Form, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { toErrorMap } from "../../../utils/toErrorMap";
import { NavBar } from "../../../components/navbar/NavBar";
import { SideNav } from "../../../components/navbar/SideNav";
import { HotTopic } from "../../../components/HotTopic";
import { FAQ } from "../../../components/FAQ/FAQ";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();

  useIsAuth();
  let postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({ variables: { id: postId } });

  const [updatePostMut, { error }] = useUpdatePostMutation();

  if (loading) {
    return (
      <>
        <NavBar></NavBar>
        <Box maxW={[300, 500, 700, 1000]} mx="auto">
          <Text>...loading</Text>
        </Box>
      </>
    );
  }

  if (!data?.post) {
    return (
      <>
        <NavBar></NavBar>
        <Box maxW={[300, 500, 700, 1000]} mx="auto">
          <Text>Couldn't find post</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <NavBar></NavBar>
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Box
          w={[300, 500, 700, 900]}
          /* mx="auto" */
          boxShadow="xl"
          borderWidth="1px"
          p={10}
        >
          <Formik
            initialValues={{ text: data?.post?.text, title: data?.post?.title }}
            onSubmit={async (values, { setErrors }) => {
              const response = await updatePostMut({
                variables: {
                  id: postId,
                  text: values.text,
                  title: values.title,
                },
                refetchQueries: [
                  { query: PostDocument, variables: { id: postId } },
                ],
              });
              if (response.data?.updatePost?.errors) {
                setErrors(toErrorMap(response.data.updatePost.errors));
                return;
              }
              router.push("/");
              return;
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Title" name="title"></InputField>
                <InputField label="Text" name="text" textarea></InputField>
                <Button
                  mt={5}
                  colorScheme={"blue"}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Update Post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box>
          <HotTopic></HotTopic>
          <FAQ></FAQ>
        </Box>
      </Flex>
    </>
  );
};

export default EditPost;
