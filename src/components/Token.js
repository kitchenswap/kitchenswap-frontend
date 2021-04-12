import React from "react";
import styled from "styled-components";
import { Image, Text } from "@chakra-ui/react";

import useTokenLogos from "../hooks/useTokenLogos";

const tokenFallbackSrc =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><ellipse ry="12" rx="12" cy="12" cx="12" fill="lightgrey"/></svg>';

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TOKEN_SIZES = {
  md: "20px",
  xl: "25px"
};

const Token = ({ token, size = "md" }) => {
  const tokenLogos = useTokenLogos();
  const { thumb } = tokenLogos.find(logo => logo.symbol === token) || {};
  const imageSize = TOKEN_SIZES[size] || TOKEN_SIZES.md;

  return (
    <TokenWrapper>
      <Image
        src={thumb}
        alt={token}
        fallbackSrc={tokenFallbackSrc}
        borderRadius="full"
        boxSize={imageSize}
        mr="2"
      />
      <Text fontSize={size}>{token}</Text>
    </TokenWrapper>
  );
};

export default Token;
