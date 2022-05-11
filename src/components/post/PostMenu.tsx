import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useDeletePostMutation, useMeQuery } from "../../generated/graphql";
import { Backdrop } from "../Backdrop/Backdrop";

interface PostMenuProps {
  postId: number;
  creatorId: number;
  commentAmount: number;
}

export const PostMenu: React.FC<PostMenuProps> = ({
  postId,
  creatorId,
  commentAmount,
}) => {
  const [delPostMut] = useDeletePostMutation();
  const { data, loading } = useMeQuery();
  const [showBackDrop, setShowBackDrop] = useState(false);

  const deletePost = async () => {
    await delPostMut({
      variables: { id: postId },
      update: (store) => {
        store.evict({ id: `Post:${postId}` });
        store.gc();
      },
    });
  };

  const hideBackDrop = () => {
    setShowBackDrop(false);
  };

  return (
    <Flex my={1}>
      {showBackDrop && (
        <Backdrop
          text="Do you want to delete this post?"
          onCancel={hideBackDrop}
          onConfirm={deletePost}
        ></Backdrop>
      )}
      <NextLink href={`/post/${postId}`}>
        <Flex align="center" ml={2}>
          <ChatIcon mr={2}></ChatIcon>
          <Link>
            <Text>{commentAmount} Comments</Text>
          </Link>
        </Flex>
      </NextLink>
      {!loading && data?.me?.id === creatorId ? (
        <Box ml={3}>
          <NextLink href={`/post/edit/${postId}`}>
            <IconButton
              aria-label="edit"
              icon={<EditIcon></EditIcon>}
            ></IconButton>
          </NextLink>
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon></DeleteIcon>}
            onClick={() => {
              setShowBackDrop(true);
            }}
          ></IconButton>
        </Box>
      ) : null}
    </Flex>
  );
};
