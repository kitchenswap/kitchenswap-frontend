import React, { useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Container,
  IconButton,
  Flex,
  Box,
  Spacer,
  Center,
  Heading,
  Text,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Link,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { ArrowBackIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import Token from "../components/Token";
import useDexPools from "../hooks/useDexPools";
import useDexUrls from "../hooks/useDexUrls";
import parseQueryString from "../util/parseQueryString";

const ESCAPE_KEY = 27;

const PairNotFound = ({ onClose }) => {
  return (
    <Center py="16" flexDirection="column">
      <Heading size="3xl" py="4">
        Pair not found
      </Heading>
      <Text fontSize="sm" onClick={onClose} className="cursor-pointer">
        Go back to the list
      </Text>
    </Center>
  );
};

const Controls = ({ onClose, children }) => (
  <Container>
    <Flex my="2">
      <Box>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          variant="outline"
          onClick={onClose}
        />
      </Box>
      <Spacer />
      <Box>
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close"
          variant="outline"
          onClick={onClose}
        />
      </Box>
    </Flex>

    <Box py="8">{children}</Box>
  </Container>
);

const TokenPair = () => {
  const pools = useDexPools();
  const dexUrls = useDexUrls();
  const { stakeToken, earnToken } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { dex = "" } = parseQueryString(search);

  const handleClose = () => {
    if (history.length) {
      return history.goBack();
    }

    history.push("/");
  };

  useEffect(() => {
    document.querySelector('#header-logo').scrollIntoView(); // a happy hack

    const onKeyPress = event => event.keyCode === ESCAPE_KEY && handleClose();
    window.document.addEventListener("keydown", onKeyPress);
    return () => {
      window.document.removeEventListener("keydown", onKeyPress);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pool = pools.find(p => {
    if (p.stakeToken === stakeToken && p.earnToken === earnToken) {
      if (dex.length > 0) {
        if (p.dex !== dex) {
          return false;
        }
      }
      return true;
    }

    return false;
  });

  if (pools.length === 0) {
    return (
      <Controls onClose={handleClose}>
        <Spinner />
      </Controls>
    );
  }

  if (!pool) {
    return (
      <Controls onClose={handleClose}>
        <PairNotFound onClose={handleClose} />
      </Controls>
    );
  }

  const { url = "" } = dexUrls.find(u => u.id === pool.dex) || {};

  const { formattedDepositFee, formattedAPR, formattedTotalLiquidity } = pool;

  return (
    <Controls onClose={handleClose}>
      <Wrap spacing="3em">
        <WrapItem>
          <Stat>
            <StatLabel>Stake</StatLabel>
            <StatNumber>
              <Token token={stakeToken} size="xl" />
            </StatNumber>
          </Stat>
        </WrapItem>

        <WrapItem>
          <Stat>
            <StatLabel>Earn</StatLabel>
            <StatNumber>
              <Token token={earnToken} size="xl" />
            </StatNumber>
          </Stat>
        </WrapItem>
      </Wrap>

      <Wrap spacing="3em">
        <WrapItem>
          <Stat>
            <StatLabel>Deposit Fee</StatLabel>
            <StatNumber>{formattedDepositFee}%</StatNumber>
          </Stat>
        </WrapItem>

        <WrapItem>
          <Stat>
            <StatLabel>TLV</StatLabel>
            <StatNumber>${formattedTotalLiquidity}</StatNumber>
          </Stat>
        </WrapItem>

        <WrapItem>
          <Stat>
            <StatLabel>APR</StatLabel>
            <StatNumber>{formattedAPR}%</StatNumber>
          </Stat>
        </WrapItem>
      </Wrap>

      <Wrap spacing="3em">
        <WrapItem>
          <Stat>
            <StatLabel>Available at</StatLabel>
            <StatNumber>
              <Link href={url} isExternal>
                <Text casing="capitalize">
                  {pool.dex} <ExternalLinkIcon m="2px" />
                </Text>
              </Link>
            </StatNumber>
          </Stat>
        </WrapItem>
      </Wrap>
    </Controls>
  );
};

export default TokenPair;
