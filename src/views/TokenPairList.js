import React, { useState, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Flex,
  Box,
  Spacer,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  UpDownIcon,
  SearchIcon,
  SmallCloseIcon
} from "@chakra-ui/icons";

import CountUp from "../components/CountUp";
import TokenButton from "../components/TokenButton";
import useDexPools from "../hooks/useDexPools";

const StyledTable = styled(Table)`
  & tbody tr {
    &:hover {
      background-color: ${props => props.$hoverColor};
    }
  }
`;

const formatTLV = n =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(parseInt(n, 10));

const formatAPR = n => {
  const value = n.toFixed(2);
  if (value.length > 10) {
    return '∞%';
  }
  return `${n.toFixed(2)}%`;
};

const SORT_FIELDS = {
  stakeToken: "stakeToken",
  earnToken: "earnToken",
  TLV: "totalLiquidity",
  APR: "APR"
};

const SORT_DIRECTIONS = {
  DESC: "DESC",
  ASC: "ASC"
};

const SortIcon = ({ field, sorting }) => {
  let Icon = UpDownIcon;

  if (field === sorting.field && sorting.direction === SORT_DIRECTIONS.ASC) {
    Icon = TriangleUpIcon;
  }
  if (field === sorting.field && sorting.direction === SORT_DIRECTIONS.DESC) {
    Icon = TriangleDownIcon;
  }

  return <Icon />;
};

const ResponsiveFlex = styled(Flex)`
  justify-content: space-between;
  & > * {
    width: 50%;
  }

  @media (max-width: 600px) {
    & {
      flex-direction: column;
    }
    & > * {
      width: 100%;
      overflow: hidden;
    }
  }
`;

const Headers = ({ onSort, sorting }) => (
  <Tr>
    <Th>
      <ResponsiveFlex>
        <Box
          py="2"
          className="cursor-pointer"
          onClick={() => onSort(SORT_FIELDS.stakeToken)}
        >
          Stake token{" "}
          <SortIcon field={SORT_FIELDS.stakeToken} sorting={sorting} />
        </Box>
        <Box
          py="2"
          className="cursor-pointer"
          onClick={() => onSort(SORT_FIELDS.earnToken)}
        >
          Earn token{" "}
          <SortIcon field={SORT_FIELDS.earnToken} sorting={sorting} />
        </Box>
      </ResponsiveFlex>
    </Th>

    <Th isNumeric>
      <ResponsiveFlex>
        <Box
          py="2"
          className="cursor-pointer"
          onClick={() => onSort(SORT_FIELDS.TLV)}
        >
          TLV <SortIcon field={SORT_FIELDS.TLV} sorting={sorting} />
        </Box>
        <Box
          py="2"
          className="cursor-pointer"
          onClick={() => onSort(SORT_FIELDS.APR)}
        >
          APR <SortIcon field={SORT_FIELDS.APR} sorting={sorting} />
        </Box>
      </ResponsiveFlex>
    </Th>
  </Tr>
);

const Filters = ({ filters, onChange }) => {
  const bg = useColorModeValue("white", "gray.800");
  const { stakeToken, earnToken } = filters;

  const handleChange = e =>
    onChange({
      ...filters,
      [e.target.name]: e.target.value
    });

  const handleClear = filter =>
    onChange({
      ...filters,
      [filter]: ""
    });

  return (
    <Flex
      style={{
        position: "sticky",
        top: 0
      }}
      bg={bg}
      my="2"
      zIndex="3"
    >
      <Box py="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Stake Token"
            value={stakeToken}
            name="stakeToken"
            onChange={handleChange}
            tabIndex="1"
          />
          {stakeToken.length > 0 && (
            <InputRightElement>
              <IconButton
                variant="ghost"
                onClick={() => handleClear("stakeToken")}
                aria-label="Clear"
                icon={<SmallCloseIcon />}
                size="sm"
                colorScheme="blue"
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>

      <Spacer px="2" />

      <Box py="4">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Earn Token"
            value={earnToken}
            name="earnToken"
            onChange={handleChange}
            tabIndex="2"
          />
          {earnToken.length > 0 && (
            <InputRightElement>
              <IconButton
                variant="ghost"
                onClick={() => handleClear("earnToken")}
                aria-label="Clear"
                icon={<SmallCloseIcon />}
                size="sm"
                colorScheme="blue"
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
    </Flex>
  );
};

const TokenPairList = () => {
  const history = useHistory();
  const { isExact } = useRouteMatch();
  const pools = useDexPools();
  const hoverColor = useColorModeValue("#ebf8ff", "#2A4365");
  const [filters, setFilters] = useState({
    stakeToken: "",
    earnToken: ""
  });
  const [sorting, setSorting] = useState({
    field: null,
    direction: null
  });

  const handleTokenClick = (e, filter, pool) => {
    if (pool[filter] !== filters[filter]) {
      e.stopPropagation();
      setFilters({
        ...filters,
        [filter]: pool[filter]
      });
    }
  };

  const handleSort = field => {
    if (sorting.field === field && sorting.direction === SORT_DIRECTIONS.ASC) {
      return setSorting({});
    }
    if (sorting.field === field && sorting.direction === SORT_DIRECTIONS.DESC) {
      return setSorting({
        direction: SORT_DIRECTIONS.ASC,
        field
      });
    }

    setSorting({
      direction: SORT_DIRECTIONS.DESC,
      field
    });
  };

  const sortedPools = useMemo(() => {
    const poolTmp = [...pools].filter(pool => {
      const { stakeToken, earnToken } = pool;
      if (filters.stakeToken.length > 0) {
        if (
          stakeToken.toLowerCase().indexOf(filters.stakeToken.toLowerCase()) ===
          -1
        ) {
          return false;
        }
      }
      if (filters.earnToken.length > 0) {
        if (
          earnToken.toLowerCase().indexOf(filters.earnToken.toLowerCase()) ===
          -1
        ) {
          return false;
        }
      }

      return true;
    });

    if (sorting.field) {
      if (
        sorting.field === SORT_FIELDS.stakeToken ||
        sorting.field === SORT_FIELDS.earnToken
      ) {
        poolTmp.sort((a, b) => {
          if (a[sorting.field] < b[sorting.field]) {
            return -1;
          }
          if (a[sorting.field] > b[sorting.field]) {
            return 1;
          }
          return 0;
        });
      } else {
        poolTmp.sort((a, b) => {
          return b[sorting.field] - a[sorting.field];
        });
      }

      if (sorting.direction === SORT_DIRECTIONS.ASC) {
        poolTmp.reverse();
      }
    }

    return poolTmp;
  }, [pools, filters, sorting]);

  const handlePairClick = pool => {
    const { dex, stakeToken, earnToken } = pool;

    const isRepeated = pools.some(
      p =>
        p.dex !== dex &&
        p.stakeToken === stakeToken &&
        p.earnToken === earnToken
    );

    const dexQueryParam = isRepeated ? `?dex=${dex}` : "";

    const pairUrl = `/pair/${stakeToken}/${earnToken}${dexQueryParam}`;

    history.push(pairUrl);
  };

  if (isExact && sortedPools.length === 0) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        display: isExact ? "block" : "none"
      }}
    >
      <Filters filters={filters} onChange={setFilters} />

      <StyledTable
        variant="simple"
        $isExactMatch={isExact}
        $hoverColor={hoverColor}
      >
        <TableCaption>Don't forget to DYOR</TableCaption>

        <Thead>
          <Headers onSort={handleSort} sorting={sorting} />
        </Thead>
        <Tbody>
          {sortedPools.map(pool => (
            <Tr
              className="cursor-pointer"
              key={pool.key}
              onClick={() => handlePairClick(pool)}
            >
              <Td>
                <ResponsiveFlex>
                  <Box py="2">
                    <TokenButton
                      variant="outline"
                      width="120px"
                      onClick={e => handleTokenClick(e, "stakeToken", pool)}
                    >
                      {pool.stakeToken}
                    </TokenButton>
                  </Box>
                  <Box py="2">
                    <TokenButton
                      variant="outline"
                      width="120px"
                      onClick={e => handleTokenClick(e, "earnToken", pool)}
                    >
                      {pool.earnToken}
                    </TokenButton>
                  </Box>
                </ResponsiveFlex>
              </Td>
              <Td isNumeric>
                <ResponsiveFlex textAlign="align-right">
                  <Box py="2" height="56px" lineHeight="46px">
                    <CountUp
                      end={pool.totalLiquidity}
                      decimals={0}
                      formattingFn={formatTLV}
                    />
                  </Box>
                  <Box py="2" height="56px" lineHeight="46px">
                    <CountUp end={pool.APR} decimals={2} suffix="%" formattingFn={formatAPR} />
                  </Box>
                </ResponsiveFlex>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Headers onSort={handleSort} sorting={sorting} />
        </Tfoot>
      </StyledTable>
    </div>
  );
};

export default TokenPairList;
