import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useBalance, useTokenContract } from '../hooks';

const Transfer = () => {
  const { loading, balance } = useBalance();
  const tokenContract = useTokenContract();

  // Pending state, recipient and amount of transfer
  const [pending, setPending] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  // Transfer `amount` of tokens to `recipient`
  const transfer = async () => {
    if (pending) return;
    setPending(true);
    const parsedAmount = ethers.utils.parseUnits(amount.toString());
    if (balance.lt(parsedAmount)) {
      alert('You do not have enough balance for this.');
    } else {
      try {
        const tx = await tokenContract.transfer(recipient, parsedAmount);
        await tx.wait();
      } catch (error) {
        alert('An unexpected error has occured.');
      }
    }
    setAmount(0);
    setRecipient('');
    setPending(false);
  };

  return (
    <div>
      <h3>Transfer token</h3>
      {pending && <p>Transaction pending...</p>}
      {loading && <p>Loading...</p>}
      <input
        type="text"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        placeholder="Recipient"
        disabled={loading || pending}
      />
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(parseInt(e.target.value))}
        placeholder="Amount"
        disabled={loading || pending}
      />
      <button disabled={loading || pending} onClick={transfer}>Transfer</button>
    </div>
  );
};

export default Transfer;