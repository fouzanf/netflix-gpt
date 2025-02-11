import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from "../utils/constants"
import { addGptMoviesResult } from "../utils/gptSlice"
import run from "../utils/geminiai";

const GptSearchBar = () => {

  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang)
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query='+
         movie +
         '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // make an API call to GPT API and get Movie Results 

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query " + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Leo, Jailer, Koi Mil Gaya";

    const gptResults = await run(gptQuery)

    const gptMovies = gptResults.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // This returns Promises because we are using async function with map

    const tmdbResults = await Promise.all(promiseArray)

    dispatch(addGptMoviesResult({movieNames: gptMovies , movieResults: tmdbResults}))
  }

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input 
            ref={searchText}
            type='text' 
            className='p-4 m-4 col-span-9' 
            placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
