import React, { HTMLAttributes } from 'react';
import styles from './input.module.scss';

interface Props {
  label: string;
  id: string;
  type: 'text' | 'email';
  placeholder?: string;
  className?: string;
}

const Input = ({ label, id, type, placeholder, className }: Props) => {
  return (
    <div className={className}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input className={styles.input__input} id={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;
