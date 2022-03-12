import React from 'react';

const Error404NotFound = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-9xl font-bold text-blue-400'>404</h1>

        <h6 className='mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl'>
          <span className='text-red-300'>Oops!</span> Page not found
        </h6>

        <p className='mb-8 text-center text-gray-500 md:text-lg'>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default Error404NotFound;
