import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Box mb={2} borderTopWidth={1}>
      <Flex align="center">
        <Text p={2} fontSize={20} fontWeight={400}>
          {question}
        </Text>
        <IconButton
          size="xs"
          aria-label=""
          borderRadius="full"
          icon={
            showAnswer ? (
              <ChevronUpIcon></ChevronUpIcon>
            ) : (
              <ChevronDownIcon></ChevronDownIcon>
            )
          }
          onClick={() => {
            setShowAnswer((prevState) => !prevState);
          }}
        ></IconButton>
      </Flex>
      {showAnswer && (
        <Text p={2} textAlign="center">
          {answer}
        </Text>
      )}
    </Box>
  );
};
