import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box
      mt={8}
      maxW={[300, 400, 500]}
      mx={"auto"}
      borderRadius={10}
      p={10}
      bgColor="white"
      opacity={0.9}
    >
      {children}
    </Box>
  );
};
