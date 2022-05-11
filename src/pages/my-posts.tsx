import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { FAQ } from "../components/FAQ/FAQ";
import { HotTopic } from "../components/HotTopic";
import { NavBar } from "../components/navbar/NavBar";
import { SideNav } from "../components/navbar/SideNav";
import { Post } from "../components/post/Post";
import { useMyPostsQuery } from "../generated/graphql";

const MyPosts: React.FC<{}> = ({}) => {
  const { data, loading } = useMyPostsQuery();
  return (
    <>
      <NavBar></NavBar>

      {loading ? <Box>loading...</Box> : null}
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Stack w={[300, 500, 700, 900]}>
          {data && !loading
            ? data.myPosts.map((post) => (
                <Post post={post} key={post.id}></Post>
              ))
            : null}
        </Stack>
        <Box>
          <HotTopic></HotTopic>
          <FAQ></FAQ>
        </Box>
      </Flex>
    </>
  );
};

export default MyPosts;
