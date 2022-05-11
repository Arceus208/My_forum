import { Stack } from "@chakra-ui/react";
import React from "react";
import { useGetCommentsQuery } from "../../generated/graphql";
import { Comment } from "./Comment";

interface CommentSectionProps {
  postId: number;
}

const createCommentTree = (list: any) => {
  let map = {} as any;
  let node;
  let roots = [];
  for (let i = 0; i < list.length; i++) {
    map[list[i].id] = i;
    list[i].children = [];
  }
  for (let i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parentId) {
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { loading, data } = useGetCommentsQuery({ variables: { postId } });

  const commentData = data?.getComments.map((comment) => {
    return { ...comment, children: null };
  });

  return (
    <Stack maxW={[300, 500, 700, 1000]} mx="auto">
      {!loading && data
        ? createCommentTree(commentData).map((comment) => {
            return (
              <Comment
                key={comment.id}
                postId={postId}
                comment={comment}
              ></Comment>
            );
          })
        : null}
    </Stack>
  );
};
