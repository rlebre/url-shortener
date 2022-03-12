import React from 'react';
import Input from '../input/input';
import styles from './create-form.module.scss';

const CreateForm = () => {
  return (
    <form className={styles.form}>
      <Input className={styles.form__input} label='Email' id='email' type='email' placeholder='ze.manel@ua.pt' />

      <Input
        className={styles.form__input}
        label='Long'
        id='long'
        type='text'
        placeholder='https://dicoogle.com/data/share?id=8ad87e87b69sdf890su'
      />

      <Input className={styles.form__input} label='Short' id='short' type='text' placeholder='dicoogle-data' />

      <div className='flex items-center justify-center'>
        <button className={styles.form__submit} type='button'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
