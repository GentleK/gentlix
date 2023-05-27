import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    movieId: '',
    popularMovies: {},
    topRatedMovies: {},
    upComingMovies: {},
    genreList: [],
    loading: true,
    selectedItem: null,
    movieTrailer: {},
    reviewsMovie: {},
    recommendationsMovie: {},
    searchMovies: {},
    searchName: '',
    fromYear: '',
    toYear: '',
    genres: [],
    sortType: '',
    sortDirection: ''
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovieId(state, action) {
            state.movieId = action.payload.id;
        },
        getPopularMovies(state, action) {
            state.popularMovies = action.payload.data;
        },
        getTopRatedMovies(state, action) {
            state.topRatedMovies = action.payload.data;
        },
        getUpComingMovies(state, action) {
            state.upComingMovies = action.payload.data;
        },
        getMoviesRequest(state, action) {
            state.loading = action.payload.loading;
        },
        getGenreList(state, action) {
            state.genreList = action.payload.data;
        },
        getSingleMovie(state, action) {
            state.selectedItem = action.payload.data;
        },
        getTrailerMovie(state, action) {
            state.movieTrailer = action.payload.data;
        },
        getReviewsMovie(state, action) {
            state.reviewsMovie = action.payload.data;
        },
        getRecommendationsMovie(state, action) {
            state.recommendationsMovie = action.payload.data;
        },
        setSearchMovies(state, action) {
            state.searchMovies = action.payload.data;
        },
        setMovieSearchCondition(state, action) {
            state.searchName = action.payload.data.searchName;
            state.fromYear = action.payload.data.fromYear;
            state.toYear = action.payload.data.toYear;
            if (action.payload.data.genres !== undefined) {
                if (Array.isArray(action.payload.data.genres)) {
                    state.genres = [...action.payload.data.genres];
                } else {
                    if (action.payload.data.genres.checked) {
                        state.genres = [...state.genres, action.payload.data.genres.id];
                    } else {
                        if (state.genres.indexOf(action.payload.data.genres.id)) {
                            state.genres.splice(state.genres.indexOf(action.payload.data.genres.id), 1);
                        }
                    }
                }
            } else {
                state.genres = [];
            }
            state.sortType = action.payload.data.sortType;
            state.sortDirection = action.payload.data.sortDirection;
        }
    }
})

export const moviesActions = movieSlice.actions;
export default movieSlice.reducer;