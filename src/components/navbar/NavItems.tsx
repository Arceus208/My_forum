import { Box, Button, Flex, Link, Stack, Image } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  MeDocument,
  MeQuery,
  PostsDocument,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";

interface NavItemProps {
  show: boolean;
}

export const NavItems: React.FC<NavItemProps> = ({ show }) => {
  const { data, loading } = useMeQuery();
  const [logoutMut, logoutData] = useLogoutMutation();

  const logoutFn = async () => {
    await logoutMut({
      update: (store, { data }) => {
        if (data?.logout) {
          store.writeQuery<MeQuery>({ query: MeDocument, data: { me: null } });
        }
      },
      refetchQueries: [{ query: PostsDocument, variables: { limit: 10 } }],
    });
  };

  let body = null;
  if (loading) {
  } else if (!data?.me) {
    body = (
      <Flex direction={["column", "column", "row"]} align="center">
        <NextLink href="/register">
          <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
            register
          </Link>
        </NextLink>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/posts">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              posts
            </Link>
          </NextLink>
        </Box>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/events">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              events
            </Link>
          </NextLink>
        </Box>
        <NextLink href="/login">
          <Link textColor={"#3182CE"} fontWeight={600}>
            login
          </Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex /* align="center" */ direction={["column", "column", "row"]}>
        <Flex align="center">
          <Image
            mr={2}
            src={data.me.image}
            alt="Preview"
            borderRadius="full"
            boxSize={10}
          ></Image>
          <Box textColor={"#3182CE"} mr={4}>
            {data.me.username}
          </Box>
        </Flex>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/posts">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              posts
            </Link>
          </NextLink>
        </Box>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/my-posts">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              my posts
            </Link>
          </NextLink>
        </Box>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/events">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              events
            </Link>
          </NextLink>
        </Box>
        <Box display={["block", "block", "none"]}>
          <NextLink href="/my-events">
            <Link textColor={"#3182CE"} mx={3} fontWeight={600}>
              my events
            </Link>
          </NextLink>
        </Box>
        <Button isLoading={logoutData.loading} onClick={logoutFn} mt={2}>
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Box
      display={{ base: show ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      {body}
    </Box>
  );
};
