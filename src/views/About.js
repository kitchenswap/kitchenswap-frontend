import React from "react";
import { Center } from "@chakra-ui/react";
import styled from "styled-components";

import Logo from "../components/Logo";

const VerticalPad = styled.div`
  padding-top: 25%;
`;

const About = () => {
  return (
    <Center>
      <VerticalPad>
        <Logo size="xl" />
      </VerticalPad>
    </Center>
  );
};

export default About;
