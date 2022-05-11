import { Box } from "@chakra-ui/react";
import React from "react";

export const Background: React.FC<{}> = ({ children }) => {
  return (
    <Box m={0} p={0} bgColor="black">
      {children}
    </Box>
  );
};
