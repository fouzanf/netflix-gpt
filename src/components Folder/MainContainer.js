import React from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if(movies == null) return;

    const mainMovies = movies[5];

    const {original_title, overview, id } = mainMovies;


    return (
      <div>
          <VideoTitle title={original_title} overview={overview} />
          <VideoBackground  movieId={id}/>
      </div>
    )
}

export default MainContainer;
