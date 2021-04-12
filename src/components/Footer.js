import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

import Logo from "./Logo";

const Footer = () => {
  return (
    <Center>
      <Flex py="12" flexWrap="wrap">
        <Box p="8">
          <NavLink to="/">
            <Logo greyscale />
          </NavLink>
        </Box>
        <Box p="8">
          <Text fontSize="sm" casing="uppercase">
            <a
              href="https://twitter.com/kitchen_swap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Text>
        </Box>
        <Box p="8">
          <Text fontSize="sm" casing="uppercase">
            <a
              href="https://medium.com/@kitchenswap"
              target="_blank"
              rel="noopener noreferrer"
            >
              MEDIUM
            </a>
          </Text>
        </Box>

        <Box p="8">
          <Text fontSize="sm" casing="uppercase">
            <a
              href="https://docs.kitchenswap.finance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOCS
            </a>
          </Text>
        </Box>
        <Box p="8">
          <Text fontSize="sm" casing="uppercase">
            <a
              href="https://docs.kitchenswap.finance//roadmap"
              target="_blank"
              rel="noopener noreferrer"
            >
              ROADMAP
            </a>
          </Text>
        </Box>
      </Flex>
    </Center>
  );
};

export default Footer;
