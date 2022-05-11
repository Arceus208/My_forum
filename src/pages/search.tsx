import React, { useEffect } from "react";
import { NavBar } from "../components/navbar/NavBar";
import {
  PostsBySearchDocument,
  usePostsBySearchQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { Post } from "../components/post/Post";
import { client } from "../utils/apolloClient";
import { SideNav } from "../components/navbar/SideNav";

interface searchProps {}

const Search: React.FC<searchProps> = ({}) => {
  const router = useRouter();
  const searchText =
    typeof router.query.search === "string" ? router.query.search : "";

  const { data, loading, fetchMore } = usePostsBySearchQuery({
    variables: { limit: 10, searchText },
  });

  useEffect(() => {
    client.refetchQueries({ include: [PostsBySearchDocument] });
  }, [router.query.search]);

  return (
    <>
      <NavBar></NavBar>
      <Flex maxW={[300, 500, 700, 1500]} mx="auto" flexDirection="row" mt={10}>
        <SideNav></SideNav>
        <Stack w={[300, 500, 700, 900]} spacing={10}>
          {data && !loading
            ? data.postsBySearch.posts.map((post) => (
                <Post post={post} key={post.id}></Post>
              ))
            : null}
          {data && data.postsBySearch.hasMore ? (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    cursor:
                      data?.postsBySearch.posts[
                        data.postsBySearch.posts.length - 1
                      ].createdAt,
                  },
                });
              }}
            >
              Load more
            </Button>
          ) : null}
        </Stack>
      </Flex>
    </>
  );
};

export default Search;
