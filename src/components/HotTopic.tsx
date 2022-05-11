import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useSortedByCommentAmountQuery } from "../generated/graphql";

interface SideMenuProps {}

export const HotTopic: React.FC<SideMenuProps> = () => {
  const { data, loading } = useSortedByCommentAmountQuery({
    variables: { limit: 4 },
  });

  return (
    <Box mb={5}>
      <Flex
        w={[0, 0, 0, 300]}
        display={{ base: "none", lg: "block" }}
        ml={4}
        flexDirection="column"
        borderWidth="1px"
        borderRadius={10}
        overflow="hidden"
      >
        <Center
          h={50}
          bgColor="#3182CE"
          w={[0, 0, 0, 300]}
          borderTopRadius={10}
          textColor="white"
        >
          Hot Topic
        </Center>
        <Box p={3}>
          {data && !loading
            ? data.sortedByCommentAmount.posts.map((post) => (
                <Flex mt={2} mr={2} key={post.id} mb={3}>
                  <Image
                    mr={2}
                    src={post.creator.image}
                    alt="Preview"
                    borderRadius="full"
                    boxSize={10}
                  ></Image>
                  <Box>
                    <NextLink href={`/post/${post.id}`}>
                      <Link>
                        <Heading fontSize="md">{post.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>Posted by {post.creator.username}</Text>
                  </Box>
                </Flex>
              ))
            : null}
        </Box>
      </Flex>
    </Box>
  );
};
