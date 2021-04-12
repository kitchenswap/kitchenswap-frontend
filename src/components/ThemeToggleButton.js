import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeToggleButton = ({ className }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const Icon = colorMode === "light" ? MoonIcon : SunIcon;

  return (
    <IconButton
      variant="outline"
      onClick={toggleColorMode}
      aria-label={`Toggle ${colorMode === "light" ? "Dark" : "Light"}`}
      icon={<Icon />}
      className={className}
    />
  );
};

export default ThemeToggleButton;
