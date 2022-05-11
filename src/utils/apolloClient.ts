import { from, ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Router from "next/router";
import { PaginatedPosts } from "../generated/graphql";
import { createUploadLink } from "apollo-upload-client";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].message === "not authenticated") {
      Router.replace("/login");
    }
  }
});

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL!,
  credentials: "include",
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing: PaginatedPosts, incoming: PaginatedPosts) {
              if (!existing) {
                return incoming;
              }
              return {
                hasMore: incoming.hasMore,
                posts: [...existing.posts, ...incoming.posts],
              };
            },
          },
          postsBySearch: {
            keyArgs: false,
            merge(existing: PaginatedPosts, incoming: PaginatedPosts) {
              if (!existing) {
                return incoming;
              }
              return {
                hasMore: incoming.hasMore,
                posts: [...existing.posts, ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});
