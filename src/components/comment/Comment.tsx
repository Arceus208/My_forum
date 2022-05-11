import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Text, Link, IconButton, Image, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  GetCommentsDocument,
  PostsDocument,
  useDeleteCommentMutation,
  useMeQuery,
} from "../../generated/graphql";
import { PostComment } from "./PostComment";

interface CommentProps {
  comment: {
    id: number;
    userId: number;
    postId: number;
    parentId?: number | null | undefined;
    username: string;
    text: string;
    children?: any;
    userImage: string;
  };
  postId: number;
}

export const Comment: React.FC<CommentProps> = ({ comment, postId }) => {
  const [showPostComment, setShowPostComment] = useState(false);
  const [delCommentMut] = useDeleteCommentMutation();
  const { data: meData } = useMeQuery();

  const nestedComments = (comment.children || []).map((comment: any) => {
    return (
      <Comment key={comment.id} comment={comment} postId={postId}></Comment>
    );
  });

  return (
    <Box
      borderLeftWidth={comment.parentId ? "1px" : "none"}
      pl={comment.parentId ? 8 : 0}
    >
      <Flex align="center">
        <Image
          mr={1}
          src={comment.userImage}
          alt="Preview"
          borderRadius="full"
          boxSize={10}
        ></Image>
        <b>{comment.username}</b>
      </Flex>
      <Text py={1}>{comment.text}</Text>
      <Link
        mr={4}
        onClick={() => {
          setShowPostComment((prev) => !prev);
        }}
        fontWeight={600}
        textColor="grey"
        _hover={{ bgColor: "lightgrey" }}
        p={2}
      >
        reply
      </Link>

      {showPostComment ? (
        <PostComment
          postId={postId}
          parentId={comment.id}
          show={setShowPostComment}
        ></PostComment>
      ) : null}
      {comment.userId === meData?.me?.id ? (
        <IconButton
          onClick={async () => {
            await delCommentMut({
              variables: { id: comment.id },
              refetchQueries: [
                { query: GetCommentsDocument, variables: { postId } },
                { query: PostsDocument, variables: { limit: 10 } },
              ],
            });
          }}
          aria-label="deleteComment"
          icon={<DeleteIcon></DeleteIcon>}
        ></IconButton>
      ) : null}
      {nestedComments}
    </Box>
  );
};
