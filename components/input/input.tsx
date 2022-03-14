import React, { ChangeEvent } from 'react';
import styles from './input.module.scss';

interface Props {
  label: string;
  id: string;
  type: 'text' | 'email';
  placeholder?: string;
  className?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, id, type, placeholder, className, value, disabled, onChange }: Props) => {
  return (
    <div className={className}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input__input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
