import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Hamburger } from "./Hamburger";
import { Logo } from "./Logo";
import { NavItems } from "./NavItems";

export const NavBar: React.FC<{}> = ({}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((curState) => {
      return !curState;
    });
  };

  return (
    <Flex
      position={"sticky"}
      zIndex={20}
      top={0}
      bgColor={"white"}
      justifyContent={[null, "space-between"]}
      direction={["column", "column", "row"]}
      p={3}
      align="center"
      minH={20}
      borderBottomWidth={2}
    >
      <Logo></Logo>
      <Hamburger toggle={toggleMenu}></Hamburger>
      <NavItems show={showMenu}></NavItems>
    </Flex>
  );
};
