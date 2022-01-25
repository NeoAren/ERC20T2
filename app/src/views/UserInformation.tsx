import React from 'react';
import { useAccount, useBalance } from '../hooks';
import { formatUnits } from '../utils/helpers';
import styles from '../styles/App.module.scss'

const UserInformation = () => {
  const { account } = useAccount();
  const { tokenBalance, etherBalance } = useBalance();
  return (
    <div className={styles.container}>
      <div className={styles.userinfo}>
        <h3>Account address: </h3>
        <p>{account ?? '...'}</p>
        <h3>Token balance:</h3>
        <p>{formatUnits(tokenBalance)} <b>ERC20T2</b></p>
        <h3>Ether balance:</h3>
        <p>{formatUnits(etherBalance)} <b>ETH</b></p>
      </div>
    </div>
  );
};

export default UserInformation;
