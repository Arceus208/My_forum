import { Flex, Heading, Text, Image, Box } from "@chakra-ui/react";
import React from "react";

interface CarouselItemProps {
  item: {
    heading: string;
    textContent: string;
    image: string;
    name: string;
    uniName: string;
  };
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <Flex
      mt={10}
      flexDirection="column"
      p={10}
      bgColor="white"
      opacity={0.9}
      m={5}
    >
      <Heading>{item.heading}</Heading>
      <Text>{item.textContent}</Text>
      <Flex>
        <Image src={item.image}></Image>
        <Box>
          <Text>{item.name}</Text>
          <Text>{item.uniName}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
