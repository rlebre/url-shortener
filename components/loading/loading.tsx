import React from 'react';
import Spinner from '../spinner/spinner';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spinner infoText='Loading...' />
    </div>
  );
};

export default Loading;
