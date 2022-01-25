import React, { ChangeEvent, useState } from 'react';
import { BigNumber } from 'ethers';
import { useAccount, useBalance, useTokenContract } from '../hooks';
import { parseUnits } from '../utils/helpers';
import styles from '../styles/App.module.scss';

const TransferOrMint = () => {
  const { account } = useAccount();
  const { tokenBalance } = useBalance();
  const tokenContract = useTokenContract();

  // Pending state, mint or transfer, recipient and amount of transfer
  const [pending, setPending] = useState(false);
  const [isMint, setIsMint] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  // Mint `amount` of tokens to `recipient`
  const mint = async (amount: BigNumber) => {
    if (!account) return;
    try {
      const ownerAddress = await tokenContract.owner();
      if (ownerAddress !== account) {
        alert('Only the owner is allowed to mint tokens.');
      } else if (amount.lte(0)) {
        alert('Please enter a positive non-zero amount.');
      } else {
        const tx = await tokenContract.mint(account, amount);
        const receipt = await tx.wait();
        alert(`Success with '${receipt.confirmations}' confirmations.`);
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error has occured.');
    }
  };

  // Transfer `amount` of tokens to `recipient`
  const transfer = async (amount: BigNumber) => {
    if (!account) return;
    try {
      if (tokenBalance.lt(amount)) {
        alert('You do not have enough balance for this.');
      } else if (amount.lte(0)) {
        alert('Please enter a positive non-zero amount.');
      } else {
        const tx = await tokenContract.transfer(recipient, amount);
        const receipt = await tx.wait();
        alert(`Success with '${receipt.confirmations}' confirmations.`);
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error has occured.');
    }
  };

  // Handle submitting the form
  const onSubmit = async () => {
    if (!account || pending) return;
    setPending(true);
    const parsedAmount = parseUnits(amount.toString());
    await (isMint ? mint(parsedAmount) : transfer(parsedAmount));
    setAmount(0);
    setRecipient('');
    setPending(false);
  };

  // Handle switching between minting and transferring
  const onIsMintChange = (e: ChangeEvent<HTMLInputElement>) => setIsMint(e.target.checked);

  return (
    <div className={styles.container}>
      <div className={styles.transfer}>
        <h3>{isMint ? 'Mint' : 'Transfer'} tokens</h3>
        {pending && <h4>Transaction pending...</h4>}
        <p>Recipient:</p>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Recipient"
          disabled={pending}
        />
        <p>Amount:</p>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          placeholder="Amount"
          disabled={pending}
        />
        <span>
          <input type="checkbox" id="mint" checked={isMint} onChange={onIsMintChange} disabled={pending} />
          <label htmlFor="mint">Should mint new tokens</label>
        </span>
        <button onClick={onSubmit} disabled={pending}>{isMint ? 'Mint' : 'Transfer'} tokens</button>
      </div>
    </div>
  );
};

export default TransferOrMint;
