import { useContext } from "react";

import { DexDataContext } from "../contexts/DexDataContext";

const useDexUrls = () => {
  const DexData = useContext(DexDataContext);

  const { dexUrls = [] } = DexData;

  return dexUrls;
};

export default useDexUrls;
