import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies: null,
        trailerVideo : null,
        popularMovies: null,
        upcomingMovies: null,
        trendingMovies: null,
        ratedMovies: null,
    },
    reducers: {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies : (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrailerVideo : (state, action) => {
            state.trailerVideo = action.payload;
        },
        addUpcomingMovies : (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTrendingMovies : (state, action) => {
            state.trendingMovies = action.payload;
        },
        addRatedMovies : (state, action) => {
            state.ratedMovies = action.payload;
        },
    }
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addUpcomingMovies, addTrendingMovies, addRatedMovies } = moviesSlice.actions; 

export default moviesSlice.reducer;