import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
    //Fetch Data from TMDB API and updates store
  const dispatch = useDispatch();

  const getNowPlayingMovies  = async () => {
    const data = await 
    fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results))
  };

  useEffect(() => { 
    getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;