import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import { NavBar } from "../../components/navbar/NavBar";
import { PostComment } from "../../components/comment/PostComment";
import { CommentSection } from "../../components/comment/CommentSection";
import { SideNav } from "../../components/navbar/SideNav";
import { HotTopic } from "../../components/HotTopic";
import { FAQ } from "../../components/FAQ/FAQ";

export const Post: React.FC<{}> = () => {
  const [showPostComment, setShowPostComment] = useState(false);
  const router = useRouter();
  let postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({ variables: { id: postId } });
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
          mx="auto"
          boxShadow="xl"
          borderWidth="1px"
          p={10}
        >
          <Box mb={10} borderBottomWidth={3} pb={10}>
            <Heading>{data?.post?.title}</Heading>
            <Text mb={4}> Posted by {data.post.creator.username}</Text>
            <Text>{data?.post?.text}</Text>
          </Box>
          <Button
            onClick={() => {
              setShowPostComment((prev) => !prev);
            }}
            colorScheme={"blue"}
          >
            Leave Comment
          </Button>
          {showPostComment ? (
            <PostComment
              postId={postId}
              show={setShowPostComment}
            ></PostComment>
          ) : null}

          <CommentSection postId={postId}></CommentSection>
        </Box>
        <Box>
          <HotTopic></HotTopic>
          <FAQ></FAQ>
        </Box>
      </Flex>
    </>
  );
};

export default Post;
