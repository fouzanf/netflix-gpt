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
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form 
        className="w-full md:w-1/2 bg-black p-6 rounded-lg shadow-lg flex items-center gap-4" 
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          ref={searchText}
          type="text" 
          className="flex-1 p-4 text-white bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button 
          className="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
  
}

export default GptSearchBar
