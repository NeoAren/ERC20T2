import { useCallback, useEffect, useState } from 'react';
import { ChainId, Fetcher, Pair, WETH } from '@uniswap/sdk';
import { useTokenContract } from './useContract';

const chainId = Number(process.env.REACT_APP_CHAIN_ID) as ChainId;

export const usePair = () => {
  const tokenContract = useTokenContract();

  // Loading state and uniswap pair
  const [loading, setLoading] = useState(true);
  const [pair, setPair] = useState<Pair>();

  // Fetch uniswap pair
  const fetchPair = useCallback(async () => {
    setLoading(true);
    const ether = WETH[chainId];
    const token = await Fetcher.fetchTokenData(chainId, tokenContract.address, undefined, "ERC20T2", "ERC-20 Test Token");
    const pairData = await Fetcher.fetchPairData(ether, token);
    setPair(pairData);
    setLoading(false);
  }, [tokenContract.address]);

  // Run fetch when hook is called
  useEffect(() => {
    fetchPair();
  }, [fetchPair]);

  return { loading, pair };
};
