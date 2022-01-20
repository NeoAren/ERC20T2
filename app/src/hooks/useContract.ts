import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useSigner } from './useSigner';
import IToken from '../ERC20T2.json';
import IRouter from '@uniswap/v2-periphery/build/IUniswapV2Router02.json';
import IFactory from '@uniswap/v2-core/build/IUniswapV2Factory.json';

// Contract addresses
const tokenAddress = '0x9BAD2B4726caA2948b659D0CF863C448f2e355B1';
const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

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

// Get the Uniswap V2 Factory contract
export const useFactoryContract = () => {
  const signer = useSigner();
  return useMemo(() => new Contract(factoryAddress, IFactory.abi, signer), [signer]);
};
