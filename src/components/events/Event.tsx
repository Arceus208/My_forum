import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { EventFragmentFragment } from "../../generated/graphql";

interface EventsTodayProps {
  event: EventFragmentFragment;
}

export const Event: React.FC<EventsTodayProps> = ({ event }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      m={5}
    >
      <Image src={event.image} alt="Pic"></Image>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {event.name}
      </Box>
      <Box color="gray.600" fontSize="sm">
        {event.location}
      </Box>
      <Box color="gray.600" fontSize="sm">
        {event.eventDate}
      </Box>
      <Box fontSize="sm">{event.description}</Box>
      <Box fontSize="sm">Start at: {event.eventTime}</Box>
    </Box>
  );
};
