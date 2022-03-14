import { useRouter } from 'next/router';
import React from 'react';

const Confirmed = () => {
  const router = useRouter();

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h6 className='mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl'>Confirmed</h6>

        <p className='mb-8 text-center text-gray-500 md:text-lg'> Thank you for confirming the short URL creation.</p>

        <button
          className='rounded bg-blue-400 py-2 px-4 font-bold text-white hover:bg-blue-500 focus:outline-none'
          type='button'
          onClick={() => router.push('/')}
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default Confirmed;
