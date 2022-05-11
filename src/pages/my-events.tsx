import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import { SideNav } from "../components/navbar/SideNav";
import { useMyEventsQuery } from "../generated/graphql";
import { Event } from "../components/events/Event";

const MyEvents: React.FC<{}> = ({}) => {
  const { data, loading } = useMyEventsQuery();

  return (
    <>
      <NavBar></NavBar>
      {loading ? <Box>loading...</Box> : null}
      <Flex
        maxW={[300, 500, 700, 1500]}
        mx="auto"
        mt={10}
        alignItems="flex-start"
      >
        <SideNav></SideNav>
        <Flex maxW={[300, 500, 700, 900]}>
          {data && !loading
            ? data.myevents.map((event) => (
                <Event event={event} key={event.id}></Event>
              ))
            : null}
        </Flex>
      </Flex>
    </>
  );
};

export default MyEvents;
