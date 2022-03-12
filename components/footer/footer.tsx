import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href='https://github.com/rlebre' target='_blank' className={styles.footer__credits}>
        <i className='eva eva-github' /> @rlebre
      </a>
    </footer>
  );
};

export default Footer;
