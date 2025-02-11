import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
import run from "../utils/geminiai";
import lang from "../utils/languageConstant"; 

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false); 

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await response.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    setIsLoading(true); 

    const gptQuery = `Suggest some movies for the query: ${searchText.current.value}. Only give me 5 movie names, comma separated. Example: Titanic, Inception, Joker, Interstellar, Avatar.`;

    const gptResults = await run(gptQuery);
    const gptMovies = gptResults.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults }));
    setIsLoading(false);
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center px-4">
      <form
        className="w-full md:w-3/5 lg:w-1/2 bg-black rounded-lg shadow-xl grid grid-cols-12 p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Input Field */}
        <input
          ref={searchText}
          type="text"
          className="p-4 col-span-9 rounded-lg border-2 border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 outline-none transition-all duration-300"
          placeholder={lang[langKey]?.gptSearchPlaceholder || "Search..."}
        />
  
        {/* Search Button */}
        <button
          className={`col-span-3 ml-3 py-3 px-6 text-white font-semibold rounded-lg flex items-center justify-center gap-3
            transition-all duration-300 ease-in-out transform
            ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl hover:scale-105"}
          `}
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : lang[langKey]?.search || "Search"} 
          {isLoading && (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
      </form>
    </div>
  );
  
};

export default GptSearchBar;


