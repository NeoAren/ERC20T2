import React, { useState } from 'react';
import { useAccount, useTokenContract } from '../hooks';
import { ethers } from 'ethers';

const Mint = () => {
  const { loading, account } = useAccount();
  const tokenContract = useTokenContract();

  // Pending state and amount of token to mint
  const [pending, setPending] = useState(false);
  const [amount, setAmount] = useState(0);

  // Mint new tokens
  const mint = async () => {
    if (loading || pending) return;
    setPending(true);
    try {
      const tx = await tokenContract.mint(account, ethers.utils.parseUnits(amount.toString()));
      await tx.wait();
      setAmount(0);
    } catch (error) {
      alert('An unexpected error has occured.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <h3>Mint new tokens</h3>
      {loading && <p>Loading...</p>}
      {pending && <p>Transaction pending...</p>}
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(parseInt(e.target.value))}
        placeholder="Amount"
        disabled={loading || pending}
      />
      <button disabled={loading || pending} onClick={mint}>Mint</button>
    </div>
  );
};

export default Mint;
