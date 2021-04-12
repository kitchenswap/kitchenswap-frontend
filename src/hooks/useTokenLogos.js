import { useContext } from "react";

import { DexDataContext } from "../contexts/DexDataContext";

const useTokenLogos = () => {
  const DexData = useContext(DexDataContext);

  const { tokenLogos = [] } = DexData;

  return tokenLogos;
};

export default useTokenLogos;
