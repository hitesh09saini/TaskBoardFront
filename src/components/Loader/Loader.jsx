
import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-gray-800  flex justify-center items-center'>
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
