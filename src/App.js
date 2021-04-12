import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import About from "./views/About";
import TokenPair from "./views/TokenPair";
import TokenPairList from "./views/TokenPairList";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Container
      style={{
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <TokenPairList /> {/** left outside of Switch for perfomance issues! */}
        <Switch>
          <Route path="/pair/:stakeToken/:earnToken">
            <TokenPair />
          </Route>

          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Container>
  );
};

export default App;
