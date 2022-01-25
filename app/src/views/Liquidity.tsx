import React, { ChangeEvent, useState } from 'react';
import { useAccount, usePair, useRouterContract, useTokenContract } from '../hooks';
import { parseUnits } from '../utils/helpers';
import styles from '../styles/App.module.scss';

const Liquidity = () => {
  const tokenContract = useTokenContract();
  const routerContract = useRouterContract();
  const { account } = useAccount();
  const { pair } = usePair();

  // Pending state, amount in token and ether
  const [pending, setPending] = useState(false);
  const [amountToken, setAmountToken] = useState(0);
  const [amountEther, setAmountEther] = useState(0);

  // Add liquidity to the token-ether pair
  const addLiquidity = async () => {
    if (!account || !pair || pending) return;
    setPending(true);
    try {
      const tx1 = await tokenContract.approve(routerContract.address, parseUnits(amountToken));
      await tx1.wait();
      const deadline = Math.ceil(Date.now() / 1000 + 30 * 60);
      const tx2 = await routerContract.addLiquidityETH(
        tokenContract.address,
        parseUnits(amountToken),
        parseUnits(amountToken * 0.95),
        parseUnits(amountEther * 0.95),
        account,
        deadline,
        { value: parseUnits(amountEther) },
      );
      const receipt2 = await tx2.wait();
      alert(`Success with '${receipt2.confirmations}' confirmations.`);
    } catch (error) {
      console.error(error);
      alert('An unexpected error has occured.');
    }
    setAmountToken(0);
    setAmountEther(0);
    setPending(true);
  };

  // Handle changing the token input and calculating ether price
  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pair) return;
    const amountInToken = parseFloat(e.target.value);
    const tokenPriceInEther = parseFloat(pair.token0Price.toSignificant(6));
    const amountInEther = amountInToken * tokenPriceInEther;
    setAmountToken(amountInToken);
    setAmountEther(amountInEther);
  };

  // Handle changing the ether input and calculate token price
  const onEtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pair) return;
    const amountInEther = parseFloat(e.target.value);
    const etherPriceInToken = parseFloat(pair.token1Price.toSignificant(6));
    const amountInToken = amountInEther * etherPriceInToken;
    setAmountToken(amountInToken);
    setAmountEther(amountInEther);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Add liquidity</h3>
        {pending && <h4>Transaction pending...</h4>}
        <p className={styles.description}>You need to supply tokens and ether <i>in equal value</i>.</p>
        <p>ERC20T2:</p>
        <input
          type="number"
          min={0}
          value={amountToken}
          onChange={onTokenChange}
          disabled={pending}
        />
        <p>ETH:</p>
        <input
          type="number"
          min={0}
          value={amountEther}
          onChange={onEtherChange}
          disabled={pending}
        />
        <button onClick={addLiquidity} disabled={pending}>Add liquidity</button>
      </div>
    </div>
  );
};

export default Liquidity;
