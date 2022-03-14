import React, { useCallback, useState } from 'react';
import Input from '../input/input';
import styles from './create-form.module.scss';

interface Props {
  onFormSubmit: (fullUrl: string, shortUrl: string, email: string) => void;
}

const CreateForm = ({ onFormSubmit }: Props) => {
  const [fullUrl, setFullUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmitClick = useCallback(() => {
    onFormSubmit(fullUrl, shortUrl, email);
  }, [fullUrl, shortUrl, email]);

  const handleClearClick = useCallback(() => {
    setFullUrl('');
    setShortUrl('');
    setEmail('');
  }, [fullUrl, shortUrl, email]);

  return (
    <form className={styles.form}>
      <Input
        className={styles.form__input}
        label='Email'
        id='email'
        type='email'
        placeholder='ze.manel@ua.pt'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        className={styles.form__input}
        label='Long'
        id='long'
        type='text'
        placeholder='https://dicoogle.com/data/share?id=8ad87e87b69sdf890su'
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
      />

      <Input
        className={styles.form__input}
        label='Short (blank for random)'
        id='short'
        type='text'
        placeholder='dicoogle-data'
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
      />

      <div className='flex items-center justify-center gap-2'>
        <button className={styles.form__submit} type='button' onClick={handleSubmitClick}>
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
