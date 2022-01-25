import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTokenContract } from './useContract';
import { useSigner } from './useSigner';
import { useAccount } from './useAccount';

// Get the token balance of the current user
export const useBalance = () => {
  const signer = useSigner();
  const tokenContract = useTokenContract();
  const { account } = useAccount();

  // Loading state and balance for token and ether
  const [tokenLoading, setTokenLoading] = useState(true);
  const [etherLoading, setEtherLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(BigNumber.from(0));
  const [etherBalance, setEtherBalance] = useState(BigNumber.from(0));

  // Fetch the current token balance and update the state
  const updateTokenBalance = useCallback(async () => {
    if (!account) return;
    setTokenLoading(true);
    setTokenBalance(await tokenContract.balanceOf(account));
    setTokenLoading(false);
  }, [account, tokenContract]);

  // Keep the token balance up-to-date
  useEffect(() => {
    if (!account) return;
    updateTokenBalance();
    const fromAccountFilter = tokenContract.filters.Transfer(account, null);
    const toAccountFilter = tokenContract.filters.Transfer(null, account)
    tokenContract.on(fromAccountFilter, updateTokenBalance);
    tokenContract.on(toAccountFilter, updateTokenBalance);
    return () => {
      tokenContract.off(fromAccountFilter, updateTokenBalance);
      tokenContract.off(toAccountFilter, updateTokenBalance);
    };
  }, [account, tokenContract, updateTokenBalance]);

  // Fetch the current ether balance and update the state
  const updateEtherBalance = useCallback(async () => {
    if (!account) return;
    setEtherLoading(true);
    setEtherBalance(await signer.getBalance());
    setEtherLoading(false);
  }, [account, signer]);

  // Keep the ether balance up-to-date
  useEffect(() => {
    if (!account) return;
    updateEtherBalance();
    signer.provider?.on('block', updateEtherBalance);
    return () => {
      signer.provider?.off('block', updateEtherBalance);
    };
  }, [account, signer, updateEtherBalance]);

  return { loading: tokenLoading || etherLoading, tokenBalance, etherBalance };
};
