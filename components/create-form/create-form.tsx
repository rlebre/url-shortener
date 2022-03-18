import React, { FormEvent, useCallback, useState } from 'react';
import { isEmail, isWebsite } from '../../lib/validators';
import Input from '../input/input';
import styles from './create-form.module.scss';

interface Props {
  onFormSubmit: (fullUrl: string, shortUrl: string, email: string) => void;
}

const CreateForm = ({ onFormSubmit }: Props) => {
  const [fullUrl, setFullUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmitClick = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onFormSubmit(fullUrl, shortUrl, email);
    },
    [fullUrl, shortUrl, email],
  );

  const handleClearClick = useCallback(() => {
    setFullUrl('');
    setShortUrl('');
    setEmail('');
  }, [fullUrl, shortUrl, email]);

  return (
    <form className={styles.form} onSubmit={handleSubmitClick}>
      <Input
        className={styles.form__input}
        label='Email'
        id='email'
        type='email'
        placeholder='ze.manel@ua.pt'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        validator={(email: string) => isEmail(email)}
      />

      <Input
        className={styles.form__input}
        label='Long'
        id='long'
        type='text'
        placeholder='https://dicoogle.com/data/share?id=8ad87e87b69sdf890su'
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
        validator={(website: string) => isWebsite(website)}
      />

      <Input
        className={styles.form__input}
        label='Short (blank for random)'
        id='short'
        type='text'
        placeholder='dicoogle-data'
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
        validator={(value: string) => value.length >= 4}
      />

      <div className='flex items-center justify-center gap-2'>
        <button className={styles.form__submit} type='submit' disabled={!fullUrl || !email}>
          Submit
        </button>

        <button className={styles.form__clear} type='button' onClick={handleClearClick}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
