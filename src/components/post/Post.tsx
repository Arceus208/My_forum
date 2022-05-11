import { Box, Flex, Image, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { PostMenu } from "./PostMenu";
import { VoteSection } from "../VoteSection";
import NextLink from "next/link";
import { PostFragmentFragment } from "../../generated/graphql";
import { getTime } from "../../utils/getTime";

interface PostProps {
  post: PostFragmentFragment;
  hasHighlight?: boolean;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Flex p={5} boxShadow="xl">
      <Box>
        <VoteSection post={post}></VoteSection>
      </Box>
      <Box>
        <Box mt={2} mr={2}>
          <NextLink href={`/post/${post.id}`}>
            <Link>
              <Heading fontSize="2xl">{post.title}</Heading>
            </Link>
          </NextLink>
          <Flex align="center">
            <Box
              borderWidth={2}
              borderColor="#3182CE"
              boxSize={16}
              borderRadius="full"
              mr={2}
            >
              <Image
                src={post.creator.image}
                alt="Preview"
                borderRadius="full"
                boxSize={16}
              ></Image>
            </Box>
            <Box my={5}>
              <Text>Posted by {post.creator.username}</Text>
              <Text opacity={0.7}>
                {
                  /* getTime(parseInt(post.createdAt)) */ parseInt(
                    post.createdAt
                  )
                }{" "}
                ago
              </Text>
            </Box>
          </Flex>

          <Text>{post.textSnippet}</Text>
        </Box>
        <Box>
          <PostMenu
            postId={post.id}
            creatorId={post.creator.id}
            commentAmount={post.commentAmount}
          ></PostMenu>
        </Box>
      </Box>
    </Flex>
  );
};
