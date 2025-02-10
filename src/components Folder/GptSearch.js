import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import {BG_URL} from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img
          src={BG_URL}
          alt='bg-image'
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch
