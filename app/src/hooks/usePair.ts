import { useCallback, useEffect, useState } from 'react';
import { ChainId, Fetcher, Pair, WETH } from '@uniswap/sdk';
import { tokenAddress } from './useContract';

const chainId = ChainId.KOVAN;

export const usePair = () => {

  // Loading state and uniswap pair
  const [loading, setLoading] = useState(true);
  const [pair, setPair] = useState<Pair>();

  // Fetch uniswap pair
  const fetchPair = useCallback(async () => {
    setLoading(true);
    const ether = WETH[chainId];
    const token = await Fetcher.fetchTokenData(chainId, tokenAddress, undefined, "ERC20T2", "ERC-20 Test Token");
    const pairData = await Fetcher.fetchPairData(ether, token);
    setPair(pairData);
    setLoading(false);
  }, []);

  // Run fetch when hook is called
  useEffect(() => {
    fetchPair();
  }, [fetchPair]);

  return { loading, pair };
};
