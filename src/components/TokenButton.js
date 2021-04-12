import React from "react";
import { Image, Button } from "@chakra-ui/react";

import useTokenLogos from "../hooks/useTokenLogos";

const tokenFallbackSrc =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><ellipse ry="12" rx="12" cy="12" cx="12" fill="lightgrey"/></svg>';

const TokenButton = props => {
  const tokenLogos = useTokenLogos();
  const { thumb } =
    tokenLogos.find(logo => logo.symbol === props.children) || {};

  return (
    <Button
      {...props}
      leftIcon={
        <Image
          src={thumb}
          alt={props.children}
          fallbackSrc={tokenFallbackSrc}
          borderRadius="full"
        />
      }
    />
  );
};

export default TokenButton;
