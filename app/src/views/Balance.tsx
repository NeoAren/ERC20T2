import React from 'react';
import { ethers } from 'ethers';
import { useBalance } from '../hooks';

const Balance = () => {
  const { loading, balance } = useBalance();
  if (loading) return <h3>Current balance: loading...</h3>;
  return (
    <h3>Current balance: {ethers.utils.formatUnits(balance)} ERC20T2</h3>
  );
};

export default Balance;
