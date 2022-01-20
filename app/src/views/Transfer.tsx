import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useTokenContract } from '../hooks';

const Transfer = () => {
  const tokenContract = useTokenContract();

  // Pending state, recipient and amount of transfer
  const [pending, setPending] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  // Transfer `amount` of tokens to `recipient`
  const transfer = async () => {
    if (pending) return;
    setPending(true);
    try {
      const tx = await tokenContract.transfer(recipient, ethers.utils.parseUnits(amount.toString()));
      await tx.wait();
      setAmount(0);
      setRecipient('');
    } catch (error) {
      alert('An unexpected error has occured.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <h3>Transfer token</h3>
      {pending && <p>Transaction pending...</p>}
      <input
        type="text"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        placeholder="Recipient"
        disabled={pending}
      />
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(parseInt(e.target.value))}
        placeholder="Amount"
        disabled={pending}
      />
      <button disabled={pending} onClick={transfer}>Transfer</button>
    </div>
  );
};

export default Transfer;
