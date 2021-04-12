import React, { useEffect, useState } from "react";

const BASE_URL = "https://data.kitchenswap.finance";

const defaultDexData = {
  dexUrls: [],
  tokenLogos: [],
  dexPools: []
};

export const DexDataContext = React.createContext();

export const DexDataProvider = ({ children }) => {
  const [dexData, setDexData] = useState(defaultDexData);

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/dex-pools.json`).then(r => r.json()),
      fetch(`${BASE_URL}/dex-urls.json`).then(r => r.json()),
      fetch(`${BASE_URL}/token-logos.json`).then(r => r.json())
    ]).then(([dexPoolsJson, dexUrlsJson, tokenLogosJson]) => {
      setDexData({
        ...dexData,
        dexPools: dexPoolsJson,
        dexUrls: dexUrlsJson,
        tokenLogos: tokenLogosJson
      });
    });
  }, []);

  const { dexUrls, dexPools, tokenLogos } = dexData;

  const value = {
    dexUrls,
    dexPools,
    tokenLogos,
    setDexData
  };

  return (
    <DexDataContext.Provider value={value}>{children}</DexDataContext.Provider>
  );
};
