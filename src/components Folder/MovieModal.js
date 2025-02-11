import React, { useState, useEffect } from "react";
import { IMG_CDN_URL, API_OPTIONS, DEFAULT_AVATAR } from "../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const MovieModal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [ottPlatforms, setOttPlatforms] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movie) return;

    const fetchTrailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        API_OPTIONS
      );
      const data = await response.json();
      const trailer = data.results.find((vid) => vid.type === "Trailer");
      if (trailer) setTrailerKey(trailer.key);
    };

    const fetchOTTPlatforms = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`,
        API_OPTIONS
      );
      const data = await response.json();
      setOttPlatforms(data.results.IN?.flatrate || []);
    };

    const fetchCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
        API_OPTIONS
      );
      const data = await response.json();
      setCast(data.cast.slice(0, 5));
    };

    fetchTrailer();
    fetchOTTPlatforms();
    fetchCast();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[10000] px-4 md:px-8"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-black bg-opacity-80 text-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto flex flex-col md:flex-row border border-gray-700 backdrop-blur-lg"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.7 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <button
            className="absolute top-4 right-6 text-2xl md:text-3xl font-bold text-white hover:text-red-500 transition-all"
            onClick={onClose}
          >
            &times;
          </button>

          <motion.img
            src={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path}` : DEFAULT_AVATAR}
            alt={movie.title}
            className="w-full sm:w-[90%] md:w-1/2 h-64 md:h-auto object-cover rounded-t-lg md:rounded-l-lg shadow-lg"
          />

          <div className="p-4 md:p-6 flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">{movie.title || movie.name}</h2>
              <p className="text-gray-300 mt-3 text-sm md:text-base">{movie.overview}</p>
              <p className="text-gray-400 mt-3 text-sm md:text-base">
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>

              <div className="flex items-center space-x-3 mt-3">
                <span className="text-yellow-400 text-lg font-semibold">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
                <span className="text-gray-400 text-xs md:text-sm">
                  IMDb: {movie.vote_average * 10}/100
                </span>
              </div>

              {ottPlatforms.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Available on:</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {ottPlatforms.map((platform) => (
                      <div key={platform.provider_id} className="flex flex-col items-center">
                        <img
                          src={`${IMG_CDN_URL}${platform.logo_path}`}
                          alt={platform.provider_name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-md shadow-md"
                        />
                        <span className="text-xs mt-1">{platform.provider_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Top Cast:</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {cast.map((actor) => (
                      <div key={actor.id} className="flex flex-col items-center">
                        <img
                          src={actor.profile_path ? `${IMG_CDN_URL}${actor.profile_path}` : DEFAULT_AVATAR}
                          alt={actor.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-500"
                        />
                        <span className="text-xs mt-1">{actor.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-red-600 text-white py-2 md:py-3 px-4 md:px-5 rounded-lg text-center text-sm md:text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105"
              >
                🎬 Watch Trailer
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;













