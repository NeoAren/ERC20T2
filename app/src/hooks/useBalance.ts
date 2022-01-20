import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useTokenContract } from './useContract';
import { useAccount } from './useAccount';

// Get the token balance of the current user
export const useBalance = () => {
  const { account, loading: accountLoading } = useAccount();
  const tokenContract = useTokenContract();

  // Loading state and account balance
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(BigNumber.from(0));

  // Update the current balance with the latest info
  const updateBalance = useCallback(async () => {
    if (!account) return;
    setLoading(true);
    setBalance(await tokenContract.balanceOf(account));
    setLoading(false);
  }, [account, tokenContract]);

  // Keep balance up-to-date
  useEffect(() => {
    updateBalance();
    const fromAccountFilter = tokenContract.filters.Transfer(account, null);
    const toAccountFilter = tokenContract.filters.Transfer(null, account)
    tokenContract.on(fromAccountFilter, updateBalance);
    tokenContract.on(toAccountFilter, updateBalance);
    return () => {
      tokenContract.off(fromAccountFilter, updateBalance);
      tokenContract.off(toAccountFilter, updateBalance);
    };
  }, [account, tokenContract, updateBalance]);

  return { loading: loading || accountLoading, balance };
};
