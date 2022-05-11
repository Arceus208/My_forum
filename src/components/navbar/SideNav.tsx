import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../../generated/graphql";

interface SideNavProps {}

export const SideNav: React.FC<SideNavProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const beforeProps = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "50px",
    width: "3px",
    bgColor: "#3182CE",
    transform: "scaleY(0)",
    transition: "transform 0.5s",
  };

  const hoverProps = {
    _before: { transform: "scaleY(1)" },
    bgColor: "#E0FFFF",
  };

  return (
    <Box mb={5}>
      <Flex
        w={[0, 0, 0, 300]}
        display={{ base: "none", lg: "block" }}
        ml={4}
        flexDirection="column"
        boxShadow="xl"
        overflow="hidden"
        mr={4}
        h="80vh"
        position="sticky"
        top={40}
      >
        <Box position="relative">
          <NextLink href="/posts">
            <Flex
              h={50}
              pl={4}
              _before={beforeProps}
              _hover={hoverProps}
              align="center"
            >
              <Link textColor={"#3182CE"} fontWeight={600}>
                Posts
              </Link>
            </Flex>
          </NextLink>
        </Box>
        {!loading && data?.me && (
          <>
            <Box position="relative">
              <NextLink href="/my-posts">
                <Flex
                  h={50}
                  pl={4}
                  _before={beforeProps}
                  _hover={hoverProps}
                  align="center"
                >
                  <Link textColor={"#3182CE"} fontWeight={600}>
                    My Post
                  </Link>
                </Flex>
              </NextLink>
            </Box>
            <Box position="relative">
              <NextLink href="/create-post">
                <Flex
                  h={50}
                  pl={4}
                  _before={beforeProps}
                  _hover={hoverProps}
                  align="center"
                >
                  <Link textColor={"#3182CE"} fontWeight={600}>
                    Create post
                  </Link>
                </Flex>
              </NextLink>
            </Box>
          </>
        )}

        <Box position="relative">
          <NextLink href="/events">
            <Flex
              h={50}
              pl={4}
              _before={beforeProps}
              _hover={hoverProps}
              align="center"
            >
              <Link textColor={"#3182CE"} fontWeight={600}>
                Events
              </Link>
            </Flex>
          </NextLink>
        </Box>
        {!loading && data?.me && (
          <>
            <Box position="relative">
              <NextLink href="/my-events">
                <Flex
                  h={50}
                  pl={4}
                  _before={beforeProps}
                  _hover={hoverProps}
                  align="center"
                >
                  <Link textColor={"#3182CE"} fontWeight={600}>
                    My Events
                  </Link>
                </Flex>
              </NextLink>
            </Box>
            <Box position="relative">
              <NextLink href="/create-event">
                <Flex
                  h={50}
                  pl={4}
                  _before={beforeProps}
                  _hover={hoverProps}
                  align="center"
                >
                  <Link textColor={"#3182CE"} fontWeight={600}>
                    Create Event
                  </Link>
                </Flex>
              </NextLink>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
