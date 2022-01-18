import React, { useEffect, useState } from 'react';
import { ChainId, Fetcher, WETH } from '@uniswap/sdk';
import { ethers } from 'ethers';
import styles from './App.module.scss';

import abi from './ERC20T2.json';

const chainId = ChainId.KOVAN;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const App = () => {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [mintAmount, setMintAmount] = useState(0);

  useEffect(() => {
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const ERC20T2 = new ethers.Contract(contractAddress, abi.abi, ethersProvider.getSigner());
    setProvider(ethersProvider);
    setContract(ERC20T2);
  }, []);

  const mint = async () => {
    if (!provider || !contract) return;
    const to = await provider.getSigner().getAddress();
    const fixedMintAmount = ethers.utils.parseUnits(mintAmount.toString(), 18);
    await contract.mint(to, fixedMintAmount);
    setMintAmount(0);
  };

  useEffect(() => {
    uniswap().catch((error) => console.error(error));
  });

  const uniswap = async () => {
    if (!provider) return;
    const weth = WETH[chainId];
    const erc20t2 = await Fetcher.fetchTokenData(chainId, contractAddress, provider, "ERC20T2", "ERC-20 Test Token");
    const pair = await Fetcher.fetchPairData(erc20t2, weth, provider);
    console.log(pair);
  };

  return (
    <div className={styles.App}>
      <h1>Hello there</h1>
      <input type="number" value={mintAmount} onChange={x => setMintAmount(parseInt(x.target.value))} />
      <button onClick={mint}>Mint tokens</button>
    </div>
  );
};

export default App;
