import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { FAQData } from "../../utils/FAQdata";
import { FAQItem } from "./FAQItem";

interface FAQProps {}

export const FAQ: React.FC<FAQProps> = ({}) => {
  return (
    <Box>
      <Flex
        w={[0, 0, 0, 300]}
        display={{ base: "none", lg: "block" }}
        ml={4}
        flexDirection="column"
        borderWidth="1px"
        borderRadius={10}
      >
        <Center borderTopRadius={10} bgColor="#3182CE" h={50} textColor="white">
          FAQ
        </Center>
        {FAQData.map((item, index) => (
          <FAQItem
            answer={item.answer}
            question={item.question}
            key={index}
          ></FAQItem>
        ))}
      </Flex>
    </Box>
  );
};
