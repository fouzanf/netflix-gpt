import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import {BG_URL} from '../utils/constants';

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
        <img
          className='h-screen object-cover md:w-screen '
          src={BG_URL}
          alt='bg-image'
        />
      </div>
    <div className=''>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
    </>
  )
}

export default GptSearch
