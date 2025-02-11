import React, { useState, useEffect } from "react";
import { IMG_CDN_URL, API_OPTIONS } from "../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const MovieModal = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          API_OPTIONS
        );
        const data = await response.json();
        const trailer = data.results.find((vid) => vid.type === "Trailer");
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [movie]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[1000]"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative border border-gray-700"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-3xl font-bold text-white hover:text-red-500 transition-all"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Movie Poster - Responsive */}
          <motion.img
            src={`${IMG_CDN_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full sm:w-[90%] md:w-1/2 h-[50vh] md:h-auto object-cover rounded-t-lg md:rounded-l-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Movie Details */}
          <div className="p-6 flex flex-col justify-between w-full md:w-1/2 overflow-y-auto no-scrollbar">
            <div>
              <h2 className="text-3xl font-extrabold tracking-wide">{movie.title || movie.name}</h2>
              <p className="text-gray-300 mt-3 text-lg">{movie.overview}</p>
              <p className="text-gray-400 mt-3 text-lg">
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>
              <p className="text-gray-400 text-lg">
                <strong>Rating:</strong> {movie.vote_average} ⭐
              </p>
            </div>

            {/* Watch Trailer Button */}
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-red-600 text-white py-3 px-5 rounded-lg text-center text-lg font-semibold tracking-wide hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
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











