import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { EventsMap } from "../components/map/EventsMap";
import { NavBar } from "../components/navbar/NavBar";
import { SideNav } from "../components/navbar/SideNav";
import { useRouter } from "next/router";
import { useGetEventsByCityQuery } from "../generated/graphql";
import { SearchBar } from "../components/SearchBar";

const Event: React.FC<{}> = ({}) => {
  const router = useRouter();
  const searchText =
    typeof router.query.search === "string" ? router.query.search : "";
  const { data, loading } = useGetEventsByCityQuery({
    variables: { city: searchText },
  });
  return (
    <>
      <NavBar></NavBar>
      <Flex>
        <SideNav></SideNav>
        <Box p={5}>
          <Text py={5}>Enter the city you want: </Text>
          <SearchBar page="events"></SearchBar>
          {data &&
            !loading &&
            data.getEventsByCity.events.length > 0 &&
            data.getEventsByCity.coordinates && (
              <EventsMap
                events={data.getEventsByCity.events}
                location={data.getEventsByCity.coordinates}
                zoom={searchText ? 10 : 5}
              ></EventsMap>
            )}
          {data &&
            !loading &&
            (data.getEventsByCity.error ||
              data.getEventsByCity.events.length === 0) && (
              <Text>There is no event for that city</Text>
            )}
        </Box>
      </Flex>
    </>
  );
};

export default Event;
