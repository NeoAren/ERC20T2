import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './App.module.scss';

import abi from './ERC20T2.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as string;

const App = () => {

  useEffect(() => {
    (async () => {

      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const ERC20T2 = new ethers.Contract(contractAddress, abi.abi, ethersProvider.getSigner());

      const result = await ERC20T2.symbol();
      console.log(result);

    })();
  }, []);

  return (
    <div className={styles.App}>Hello there</div>
  );
};

export default App;
