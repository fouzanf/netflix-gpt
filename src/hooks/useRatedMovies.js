import { useDispatch, useSelector } from "react-redux";
import { addRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useRatedMovies = () => {
    //Fetch Data from TMDB API and updates store
  const dispatch = useDispatch();

  const ratedMovies = useSelector((store) => store.movies.ratedMovies);

  const getRatedMovies  = async () => {
    const data = await 
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addRatedMovies(json.results))
  };

  useEffect(() => { 
    !ratedMovies &&
    getRatedMovies();
  },[]);
};

export default useRatedMovies;