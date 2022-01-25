import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useSigner } from './useSigner';
import IRouter from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';
import IToken from '../ERC20T2.json';

// Contract addresses
const tokenAddress = process.env.REACT_APP_TOKEN_CONTRACT as string;
const routerAddress = process.env.REACT_APP_ROUTER_CONTRACT as string;

// Get the ERC20T2 contract
export const useTokenContract = () => {
  const signer = useSigner();
  return useMemo(() => new Contract(tokenAddress, IToken.abi, signer), [signer]);
};

// Get the Uniswap V2 Router 2.0 contract
export const useRouterContract = () => {
  const signer = useSigner();
  return useMemo(() => new Contract(routerAddress, IRouter.abi, signer), [signer]);
};
