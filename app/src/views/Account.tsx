import React from 'react';
import { useAccount } from '../hooks/useAccount';

const Account = () => {
  const { loading, account } = useAccount();
  if (loading) return <h3>Current account: loading...</h3>;
  return (
    <h3>Current account: {account}</h3>
  );
};

export default Account;
