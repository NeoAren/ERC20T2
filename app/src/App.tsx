import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { SignerContext } from './context/SignerContext';
import Account from './views/Account';
import Balance from './views/Balance';
import Mint from './views/Mint';
import Transfer from './views/Transfer';
import styles from './App.module.scss';

const App = () => {
  const [signer, setSigner] = useState<Signer | null>(null);

  // Initialize the app by connecting a web3 provider
  const init = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      setSigner(provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignerContext.Provider value={signer}>
      <div className={styles.App}>
        <h1>ERC-20 Test Token</h1>
        <hr />
        {signer ? (
          <>
            <Account />
            <Balance />
            <hr />
            <Mint />
            <Transfer />
          </>
        ) : (
          <button onClick={init}>Connect</button>
        )}
      </div>
    </SignerContext.Provider>
  );
};

export default App;
