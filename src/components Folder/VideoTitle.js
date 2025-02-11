import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-white bg-gradient-to-r from-black/80 via-black/50 to-transparent p-6 md:p-24">
  <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg">{title}</h1>
  <p className="hidden md:block py-6 text-lg md:w-1/2 text-gray-200">{overview}</p>
  
  <div className="mt-4 flex items-center gap-4">
    <button className="flex items-center gap-2 bg-white text-black py-2 md:py-4 px-4 md:px-12 text-xl font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition duration-300">
      ▶ Play
    </button>
    <button className="hidden md:flex bg-gray-500 text-white py-2 px-6 md:py-4 md:px-12 text-xl bg-opacity-50 rounded-lg shadow-md hover:bg-opacity-70 transition duration-300">
      More Info
    </button>
  </div>
</div>

  );
};

export default VideoTitle;

