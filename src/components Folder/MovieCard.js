import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie, onClick }) => {
  if (!movie.poster_path) return null;
  return (
    <div className="w-36 md:w-48 pr-4 cursor-pointer transition-transform transform hover:scale-105" onClick={onClick}>
      <img alt={movie.title} src={IMG_CDN_URL + movie.poster_path} className="rounded-lg shadow-md" />
    </div>
  );
};

export default MovieCard;
