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
        <h3>Account information</h3>
        <b>Account address:</b>
        <p>{account ?? '...'}</p>
        <b>Token balance:</b>
        <p>{formatUnits(tokenBalance)} <b>ERC20T2</b></p>
        <b>Ether balance:</b>
        <p>{formatUnits(etherBalance)} <b>ETH</b></p>
      </div>
    </div>
  );
};

export default UserInformation;
