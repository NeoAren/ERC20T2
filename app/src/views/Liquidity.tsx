import React, { ChangeEvent, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, usePair, useRouterContract, useTokenContract } from '../hooks';
import styles from '../styles/Liquidity.module.scss';

const parseUnits = (amount: string | number) => ethers.utils.parseUnits(amount.toString());

const Liquidity = () => {
  const tokenContract = useTokenContract();
  const routerContract = useRouterContract();
  const { loading: accountLoading, account } = useAccount();
  const { loading: pairLoading, pair } = usePair();

  const [amountEther, setAmountEther] = useState(0);
  const [amountToken, setAmountToken] = useState(0);

  const addLiquidity = async () => {
    try {
      // Approve tokens to uniswap router
      const tx1 = await tokenContract.approve(routerContract.address, parseUnits(amountToken));
      const receipt1 = await tx1.wait();
      console.log(receipt1);
      // Add liquidity
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
      const receipt2 = tx2.wait();
      console.log(receipt2);
    } catch (error) {
      console.error(error);
      alert('An unexpected error has occured.');
    }
  };

  const getTokenPrice = () => pair?.token0Price.toSignificant(6);

  const getEtherPrice = () => pair?.token1Price.toSignificant(6);

  const onTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pair) return;
    const amountInToken = parseFloat(e.target.value);
    const tokenPriceInEther = parseFloat(pair.token0Price.toSignificant(6));
    const amountInEther = amountInToken * tokenPriceInEther;
    setAmountToken(amountInToken);
    setAmountEther(amountInEther);
  };

  const onEtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pair) return;
    const amountInEther = parseFloat(e.target.value);
    const etherPriceInToken = parseFloat(pair.token1Price.toSignificant(6));
    const amountInToken = amountInEther * etherPriceInToken;
    setAmountToken(amountInToken);
    setAmountEther(amountInEther);
  };

  if (!pair) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <h3>Add liquidity</h3>
      <p>You need to supply ERC20T2 and ETH <i>in equal value</i>.</p>
      <span><b>1</b> ERC20T2 = <b>{getTokenPrice()}</b> ETH</span>
      <span><b>1</b> ETH = <b>{getEtherPrice()}</b> ERC20T2</span>
      <div className={styles.form}>
        <p>ERC20T2:</p>
        <input type="number" value={amountToken} onChange={onTokenChange} min={0} />
        <p>ETH:</p>
        <input type="number" value={amountEther} onChange={onEtherChange} min={0} />
        <button onClick={addLiquidity}>Add liquidity</button>
      </div>
    </div>
  );
};

export default Liquidity;
