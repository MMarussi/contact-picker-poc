import React from 'react';
import { bool } from 'prop-types';

import styles from './styles.module.scss';

function Snackbar({ online }) {
  return (
    <div className={`${online && 'hidden'} ${styles.snackbar}`}>
      <span className="m-right-20">Atención</span>
      <span>x</span>
    </div>
  );
}

Snackbar.propTypes = {
  online: bool
};

export default Snackbar;
