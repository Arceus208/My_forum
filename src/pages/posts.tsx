import React from "react";
import { Box, Button, Link, Stack, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import { Post } from "../components/post/Post";
import { usePostsQuery } from "../generated/graphql";
import { HotTopic } from "../components/HotTopic";
import { FAQ } from "../components/FAQ/FAQ";
import { SideNav } from "../components/navbar/SideNav";
import { SearchBar } from "../components/SearchBar";
import NextLink from "next/link";

const Posts: React.FC<{}> = () => {
  const { data, loading, fetchMore } = usePostsQuery({
    variables: { limit: 10 },
  });

  return (
    <>
      <NavBar></NavBar>

      {loading ? <Box>loading...</Box> : null}
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Stack w={[300, 500, 700, 900]} spacing={10}>
          <SearchBar page="search"></SearchBar>
          <Button colorScheme="blue" maxW="200">
            <NextLink href="/create-post">
              <Link> Create Post</Link>
            </NextLink>
          </Button>
          {data && !loading
            ? data.posts.posts.map((post) => (
                <Post post={post} key={post.id}></Post>
              ))
            : null}
          {data && data.posts.hasMore ? (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    cursor:
                      data?.posts.posts[data.posts.posts.length - 1].createdAt,
                  },
                });
              }}
            >
              Load more
            </Button>
          ) : null}
        </Stack>
        <Box>
          <HotTopic></HotTopic>
          <FAQ></FAQ>
        </Box>
      </Flex>
    </>
  );
};

export default Posts;
