import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { debounce } from '../../lib/debounce';
import styles from './input.module.scss';

interface Props {
  label: string;
  id: string;
  type: 'text' | 'email';
  placeholder?: string;
  className?: string;
  value: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  validator?: (value: string) => boolean;
}

const Input = ({ label, id, type, placeholder, className, disabled, onChange, validator }: Props) => {
  const [touched, setTouched] = useState(false);
  const [inputValid, setInputValid] = useState(true);
  const [value, setValue] = useState('');

  const delayedValidate = debounce(() => validate(), 300);

  const validate = () => {
    if (touched && validator) {
      setInputValid(validator?.(value));
    }
  };

  useEffect(() => delayedValidate(), [value]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={className}>
      <label className={styles.input__label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input__input} ${inputValid ? '' : styles.input__input__error}`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        disabled={disabled}
        onFocus={() => setTouched(true)}
      />
      {!inputValid && <i className={`${styles.input__input__error__icon} eva eva-close-circle`} />}
    </div>
  );
};

export default Input;
