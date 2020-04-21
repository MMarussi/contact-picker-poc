import React from 'react';
import { bool } from 'prop-types';

import bitcoinIcon from '../../assets/bitcoin-icon.png';
import ethereumIcon from '../../assets/ethereum-icon.png';
import litecoinIcon from '../../assets/litecoin-icon.png';

import styles from './styles.module.scss';

function Header({ online }) {
  return (
    <header>
      <nav className={`row space-between middle ${styles.container}`}>
        <h1 className="header title-1">CryptoCharts</h1>
        <span className={online ? 'info-msg' : 'error-msg'}>{online ? 'En línea' : 'Offline'}</span>
        <div>
          <img className={styles.icon} src={bitcoinIcon} alt="Bitcoin" />
          <img className={styles.icon} src={ethereumIcon} alt="Ethereum" />
          <img className={styles.icon} src={litecoinIcon} alt="Litecoin" />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  online: bool
};

export default Header;
