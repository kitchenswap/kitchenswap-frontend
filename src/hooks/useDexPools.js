import { useMemo, useContext } from "react";

import { DexDataContext } from "../contexts/DexDataContext";
import shuffleArray from "../util/shuffleArray";

const processPools = (dexPools = []) => {
  const pools = [];

  dexPools.forEach(({ id, value }) => {
    const keys = new Set();

    value.forEach(pool => {
      const key = `${id}_${pool.stakeToken}_${pool.earnToken}`;

      if (!keys.has(key)) {
        pools.push({
          ...pool,
          formattedTotalLiquidity: new Intl.NumberFormat().format(
            parseInt(pool.totalLiquidity, 10)
          ),
          formattedAPR: pool.APR.toFixed(2),
          formattedDepositFee: (pool.depositFee || 0).toFixed(2),
          depositFee: pool.depositFee || 0,
          dex: id,
          key
        });
      }

      keys.add(key);
    });
  });

  shuffleArray(pools);

  return pools;
};

const useDexPools = () => {
  const DexData = useContext(DexDataContext);
  const { dexPools = [] } = DexData;

  const pools = useMemo(() => processPools(dexPools), [dexPools]);

  return pools;
};

export default useDexPools;
