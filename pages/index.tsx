import type { NextPage } from 'next';
import Head from 'next/head';
import CreateForm from '../components/create-form/create-form';
import Footer from '../components/footer/footer';

const Home: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2 text-sm'>
      <Head>
        <title>Link Shortener</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='mb-20 flex w-full flex-col items-center justify-center'>
        <h1 className='mt-3 text-2xl font-bold'>Link shortener</h1>
      </div>

      <div className='flex w-full flex-col items-center md:w-2/3'>
        <CreateForm />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
