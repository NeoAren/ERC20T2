import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { SignerContext } from '../context/SignerContext';
import UserInformation from './UserInformation';
import TransferOrMint from './TransferOrMint';
import Liquidity from './Liquidity';
import Swap from './Swap';
import styles from '../styles/App.module.scss';

const App = () => {
  const [signer, setSigner] = useState<Signer | null>(null);

  // Initialize the app by connecting a web3 provider
  const init = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'kovan');
      setSigner(provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SignerContext.Provider value={signer}>
      <div className={styles.app}>
        <h1>ERC-20 Test Token</h1>
        {signer ? (
          <>
            <UserInformation />
            <TransferOrMint />
            <Liquidity />
            <Swap />
          </>
        ) : (
          <button className={styles.initButton} onClick={init}>Connect</button>
        )}
      </div>
    </SignerContext.Provider>
  );
};

export default App;
