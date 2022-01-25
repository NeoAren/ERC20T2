import React, { ChangeEvent, useState } from 'react';
import { useAccount, usePair, useRouterContract, useTokenContract } from '../hooks';
import styles from '../styles/App.module.scss';
import { TokenAmount } from '@uniswap/sdk';
import { parseUnits } from '../utils/helpers';

const Swap = () => {
  const tokenContract = useTokenContract();
  const routerContract = useRouterContract();
  const { account } = useAccount();
  const { pair } = usePair();

  // Pending state, and amount in token and ether
  const [pending, setPending] = useState(false);
  const [amountToken, setAmountToken] = useState(0);
  const [amountEther, setAmountEther] = useState(0);

  // Swap tokens for ether
  const swapTokenForEther = async () => {
    if (!pair || !account || pending) return;
    setPending(true);
    try {
      const tx1 = await tokenContract.approve(routerContract.address, parseUnits(amountToken));
      await tx1.wait();
      const deadline = Math.ceil(Date.now() / 1000 + 30 * 60);
      const tx2 = await routerContract.swapExactTokensForETH(
        parseUnits(amountToken),
        parseUnits(amountEther * 0.95),
        [pair.token0.address, pair.token1.address],
        account,
        deadline,
      );
      const receipt = await tx2.wait();
      alert(`Success with '${receipt.confirmations}' confirmations.`);
    } catch (error) {
      alert('An unexpected error has occured.');
      console.error(error);
    }
    setAmountToken(0);
    setAmountEther(0);
    setPending(false);
  };

  // Swap ether for tokens
  const swapEtherForToken = async () => {
    if (!pair || !account || pending) return;
    setPending(true);
    try {
      const deadline = Math.ceil(Date.now() / 1000 + 30 * 60);
      const tx = await routerContract.swapExactETHForTokens(
        parseUnits(amountToken * 0.95),
        [pair.token1.address, pair.token0.address],
        account,
        deadline,
        { value: parseUnits(amountEther) },
      );
      const receipt = await tx.wait();
      alert(`Success with '${receipt.confirmations}' confirmations.`);
    } catch (error) {
      alert('An unexpected error has occured.');
      console.error(error);
    }
    setAmountToken(0);
    setAmountEther(0);
    setPending(false);
  };

  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pair || !account) return;
    const amountInToken = parseFloat(e.target.value);
    try {
      const tokenAmount = new TokenAmount(pair.token0, parseUnits(amountInToken).toBigInt());
      const [etherAmount] = pair.getOutputAmount(tokenAmount);
      const amountInEther = parseFloat(etherAmount.toSignificant(6));
      setAmountEther(amountInEther);
    } catch (error) {
      setAmountEther(NaN);
    }
    setAmountToken(amountInToken);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Swap tokens for ether</h3>
        {pending && <h4>Transaction pending...</h4>}
        <p>ERC20T2:</p>
        <input
          type="number"
          min={0}
          value={amountToken}
          onChange={onTokenChange}
          disabled={pending}
        />
        <p>ETH:</p>
        <p>{amountEther ? amountEther : '-'}</p>
        <button onClick={swapTokenForEther} disabled={pending}>Swap</button>
      </div>
    </div>
  );
};

export default Swap;
