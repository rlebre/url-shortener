import type { NextPage } from 'next';
import Head from 'next/head';

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
        <form className='mb-4 w-4/5 rounded bg-white px-8 pt-6 pb-8 shadow-md'>
          <div className='mb-4 md:flex md:items-center md:justify-between'>
            <label className='block font-bold text-gray-700 md:w-1/4 md:text-left' htmlFor='username'>
              Email
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xs leading-tight text-gray-700 shadow focus:outline-none md:w-3/4'
              id='email'
              type='email'
              placeholder='ze.manel@ua.pt'
            />
          </div>

          <div className='mb-4 md:flex md:items-center md:justify-between'>
            <label className='block font-bold text-gray-700 md:w-1/4 md:text-left' htmlFor='username'>
              Long
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xs leading-tight text-gray-700 shadow focus:outline-none md:w-3/4'
              id='long'
              type='text'
              placeholder='https://dicoogle.com/data/share?id=8ad87e87b69sdf890su'
            />
          </div>

          <div className='mb-4 md:flex md:items-center md:justify-between'>
            <label className='block font-bold text-gray-700 md:w-1/4 md:text-left ' htmlFor='username'>
              Short (blank to random)
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xs leading-tight text-gray-700 shadow focus:outline-none md:w-3/4'
              id='short'
              type='text'
              placeholder='dicoogle-data'
            />
          </div>

          <div className='flex items-center justify-center'>
            <button
              className='focus:shadow-outline rounded bg-blue-400 py-2 px-4 font-bold text-white hover:bg-blue-500 focus:outline-none'
              type='button'
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <footer className='absolute bottom-0 h-20 w-full items-center justify-center border-t text-xs'>
        <a href='https://github.com/rlebre' target='_blank' className='flex items-center justify-center gap-1 pt-8'>
          <i className='eva eva-github' /> @rlebre
        </a>
      </footer>
    </div>
  );
};

export default Home;
