import { AxiosError, AxiosResponse } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import CreateForm from '../components/create-form/create-form';
import Footer from '../components/footer/footer';
import { Modal } from '../components/modal/modal';
import { StatusCode } from '../constants/StatusCodes';
import DbStatus from '../interfaces/DbStatus';
import { createShortenURL } from '../services/url-service';

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalStatus, setModalStatus] = useState<StatusCode | undefined>();

  const onModalClose = () => setShowModal(false);

  const onFormSubmit = (fullUrl: string, shortUrl: string, email: string) => {
    createShortenURL(fullUrl, email, shortUrl)
      .then((response: AxiosResponse<DbStatus>) => {
        setModalMessage(response.data.message);
        setModalStatus(response.data.status);
        setShowModal(true);
      })
      .catch((error: AxiosError<DbStatus>) => {
        setModalMessage(error.response?.data.message || 'Unknown error.');
        setModalStatus(error.response?.data.status);
        setShowModal(true);
      });
  };

  return (
    <>
      {showModal && (
        <Modal status={modalStatus} handleCloseClick={() => onModalClose()}>
          {modalMessage}
        </Modal>
      )}

      <div className='flex min-h-screen flex-col items-center justify-center py-2 text-sm'>
        <Head>
          <title>URL Shortener</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='mb-20 flex w-full flex-col items-center justify-center'>
          <h1 className='mt-3 text-2xl font-bold'>URL Shortener</h1>
        </div>

        <div className='flex w-full flex-col items-center md:w-2/3'>
          <CreateForm onFormSubmit={onFormSubmit} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
