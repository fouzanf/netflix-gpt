import React from 'react'
import { BsPlayFill } from "react-icons/bs";
const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video absolute pt-[20%] px-6 md:px-24  text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-2/4'>{overview}</p>
        <div className='flex gap-3 my-4 md:m-0'>

          <button className="flex items-center gap-2 justify-center bg-white text-black font-bold tracking-wide p-2 md:p-4 px-4 md:px-12 text-lg md:text-xl rounded-lg shadow-md transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-95">
            <BsPlayFill className="text-2xl md:text-3xl" />
            <span  className="font-semibold md:font-extrabold">Play</span>
          </button>

          <button className="hidden md:flex items-center gap-2 justify-center bg-gray-500 text-white font-bold tracking-wide p-4 px-12 text-lg md:text-xl rounded-lg shadow-md bg-opacity-60 transition-all duration-300 hover:bg-opacity-80 hover:scale-105 active:scale-95">
            <span className="font-semibold md:font-extrabold">More Info</span>
          </button>


        </div>
    </div>
  )
}

export default VideoTitle

