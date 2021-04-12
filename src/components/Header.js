import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Box, Spacer } from "@chakra-ui/react";

import ThemeToggleButton from "./ThemeToggleButton";
import Logo from "./Logo";

const Header = () => {
  return (
    <Flex my="2">
      <Box py="4">
        <NavLink to="/">
          <Logo size="md" />
        </NavLink>
      </Box>
      <Spacer px="2" />
      <Box py="4">
        <ThemeToggleButton />
      </Box>
    </Flex>
  );
};

export default Header;
