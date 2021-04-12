import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

import { DexDataProvider } from "./contexts/DexDataContext";

const initialColorMode =
  window.localStorage.getItem("chakra-ui-color-mode") || "light";

const config = {
  initialColorMode,
  useSystemColorMode: false
};

const theme = extendTheme({ config });

const Providers = ({ children }) => (
  <DexDataProvider>
    <Router>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </Router>
  </DexDataProvider>
);

export default Providers;
