import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Box } from "@chakra-ui/react";
import React from "react";

interface HamburgerProps {
  toggle: () => void;
}

export const Hamburger: React.FC<HamburgerProps> = ({ toggle }) => {
  return (
    <IconButton
      my={2}
      onClick={toggle}
      aria-label=""
      icon={<HamburgerIcon />}
      display={["block", "block", "none"]}
    ></IconButton>
  );
};
