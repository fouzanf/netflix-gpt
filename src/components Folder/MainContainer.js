import React from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if(movies == null) return;

    const mainMovies = movies[4];

    const {title, overview, id } = mainMovies;


    return (
      <div>
          <VideoTitle title={title} overview={overview} />
          <VideoBackground  movieId={id}/>
      </div>
    )
}

export default MainContainer;
