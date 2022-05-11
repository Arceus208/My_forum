import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

interface BackdropProps {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({
  text,
  onCancel,
  onConfirm,
}) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      bgColor="rgba(0, 0, 0, 0.75)"
      zIndex={100}
      onClick={onCancel}
    >
      <Box
        bgColor="white"
        position="fixed"
        top="20vh"
        left="20vw"
        w="60vw"
        borderRadius={10}
        px={10}
        pt={10}
        pb={5}
      >
        <Box fontSize="xl" textAlign="center">
          {text}
        </Box>
        <Flex justifyContent="center" mt={5}>
          <Button colorScheme="blue" mr={2} onClick={onConfirm}>
            Confirm
          </Button>
          <Button colorScheme="red" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
