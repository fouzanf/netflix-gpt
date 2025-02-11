import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal"; // Import the modal component

const MovieList = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-custom">
        <div className="flex space-x-4">
          {movies?.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} // Pass full movie object
              onClick={() => setSelectedMovie(movie)} // Set selected movie on click
            />
          ))}
        </div>
      </div>

      {/* Show the modal if a movie is selected */}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default MovieList;
