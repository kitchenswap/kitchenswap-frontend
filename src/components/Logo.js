import React from "react";
import { useColorMode } from "@chakra-ui/react";
import styled from "styled-components";

const LOGO_SIZES = {
  sm: "1em",
  md: "2em",
  xl: "3em"
};

const LogoStyle = styled.div`
  font-family: "Baloo Chettan\ 2", sans-serif;
  color: ${props => (props.$colorMode === "dark" ? "#fff" : "#fd3f92")};

  ${props => {
    const size = LOGO_SIZES[props.$size] || LOGO_SIZES.sm;

    const grayscale = props.$greyscale ? "filter: grayscale(100%)" : "";

    return `
      font-size: ${size};
      ${grayscale};
    `;
  }}
`;

const Logo = ({ size, greyscale = false }) => {
  const { colorMode } = useColorMode();

  return (
    <LogoStyle $colorMode={colorMode} $size={size} $greyscale={greyscale}>
      <b>kitchen</b>swap
    </LogoStyle>
  );
};

export default Logo;
