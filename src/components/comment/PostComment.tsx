import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  GetCommentsDocument,
  PostsDocument,
  usePostCommentMutation,
} from "../../generated/graphql";
import { InputField } from "../InputField";

interface CommentProps {
  postId: number;
  parentId?: number;
  show: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostComment: React.FC<CommentProps> = ({
  postId,
  parentId,
  show,
}) => {
  const [postCommentMut] = usePostCommentMutation();
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async (values) => {
        await postCommentMut({
          variables: { postId, text: values.text, parentId },
          refetchQueries: [
            { query: GetCommentsDocument, variables: { postId } },
            { query: PostsDocument, variables: { limit: 10 } },
          ],
        });
        show(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
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
  );
};
