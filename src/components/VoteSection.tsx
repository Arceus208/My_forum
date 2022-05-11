import { gql } from "@apollo/client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  PostFragmentFragment,
  useMeQuery,
  useVoteMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";

interface VoteSectionProps {
  post: PostFragmentFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [voteMut] = useVoteMutation();
  const { data } = useMeQuery();
  const router = useRouter();
  console.log(post.voteStatus);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      mr={4}
      mt={2}
    >
      <IconButton
        size="sm"
        aria-label="vote up"
        icon={<TriangleUpIcon />}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        onClick={async () => {
          if (!data?.me?.id) {
            router.push("/login");
            return;
          }

          await voteMut({
            variables: { postId: post.id, value: 1 },
            update: (store, _) => {
              const currentPostData = store.readFragment({
                id: `Post:${post.id}`,
                fragment: gql`
                  fragment points on Post {
                    points
                    voteStatus
                  }
                `,
              }) as any;

              let pointToAdd = 0;
              if (currentPostData.voteStatus === 1) {
                pointToAdd = -1;
              } else if (currentPostData.voteStatus === -1) {
                pointToAdd = 2;
              } else {
                pointToAdd = 1;
              }

              store.writeFragment({
                id: `Post:${post.id}`,
                fragment: gql`
                  fragment points on Post {
                    points
                    voteStatus
                  }
                `,
                data: {
                  points: currentPostData.points + pointToAdd,
                  voteStatus: pointToAdd !== -1 ? 1 : null,
                },
              });
            },
          });
        }}
      ></IconButton>
      {post.points}
      <IconButton
        size="sm"
        aria-label="vote down"
        icon={<TriangleDownIcon />}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        onClick={async () => {
          if (!data?.me?.id) {
            router.push("/login");
            return;
          }

          await voteMut({
            variables: { postId: post.id, value: -1 },
            update: (store, _) => {
              const currentPostData = store.readFragment({
                id: `Post:${post.id}`,
                fragment: gql`
                  fragment points on Post {
                    points
                    voteStatus
                  }
                `,
              }) as any;

              let pointToAdd = 0;
              if (currentPostData.voteStatus === -1) {
                pointToAdd = 1;
              } else if (currentPostData.voteStatus === 1) {
                pointToAdd = -2;
              } else {
                pointToAdd = -1;
              }

              store.writeFragment({
                id: `Post:${post.id}`,
                fragment: gql`
                  fragment points on Post {
                    points
                    voteStatus
                  }
                `,
                data: {
                  points: currentPostData.points + pointToAdd,
                  voteStatus: pointToAdd !== 1 ? -1 : null,
                },
              });
            },
          });
        }}
      ></IconButton>
    </Flex>
  );
};
