import { moviesActions } from '../reducers/moviesReducer'
import api from '../api';

function setLoading(loading) {
    return (dispatch) => {
        dispatch(moviesActions.getMoviesRequest({ loading }));
    }
}

function setMovieId(id) {
    return (dispatch) => {
        dispatch(moviesActions.setMovieId({ id }));
    }
}

function getMovies() {
    const apiKey = context.production.environment.REACT_APP_API_KEY
    return async (dispatch) => {
        try {
            dispatch(moviesActions.getMoviesRequest({ loading: true }));

            const popularMovieApi = api.get(`/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
            const topRatedMovieApi = api.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
            const upComingMovieApi = api.get(`/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
            const genreApi = api.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`);

            let [popularMovies, topRatedMovies, upComingMovies, genreList] = await Promise.all([popularMovieApi, topRatedMovieApi, upComingMovieApi, genreApi])

            dispatch(moviesActions.getPopularMovies({ data: popularMovies.data }));
            dispatch(moviesActions.getTopRatedMovies({ data: topRatedMovies.data }));
            dispatch(moviesActions.getUpComingMovies({ data: upComingMovies.data }));
            dispatch(moviesActions.getGenreList({ data: genreList.data.genres }));
            dispatch(moviesActions.getMoviesRequest({ loading: false }));

        } catch (error) {
            dispatch(moviesActions.getMoviesRequest({ loading: false }));
        }
    }
}

function getMovie(id) {
    const apiKey = context.production.environment.REACT_APP_API_KEY
    return async (dispatch) => {
        try {
            dispatch(moviesActions.getMoviesRequest({ loading: true }));
            dispatch(moviesActions.setMovieId({ id }));

            const movieDetailApi = api.get(`/movie/${id}?api_key=${apiKey}&language=en-US`);
            const movieTrailerApi = api.get(`/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
            const movieReviewsApi = api.get(`/movie/${id}/reviews?api_key=${apiKey}&language=en-US`);
            const movieRecommendationsApi = api.get(`/movie/${id}/recommendations?api_key=${apiKey}&language=en-US`);

            let [movieDetail, movieTrailer, movieReviews, movieRecommendations] = await Promise.all([movieDetailApi, movieTrailerApi, movieReviewsApi, movieRecommendationsApi]);

            dispatch(moviesActions.getSingleMovie({ data: movieDetail.data }));
            dispatch(moviesActions.getTrailerMovie({ data: movieTrailer.data }));
            dispatch(moviesActions.getReviewsMovie({ data: movieReviews.data }));
            dispatch(moviesActions.getRecommendationsMovie({ data: movieRecommendations.data }));

            dispatch(moviesActions.getMoviesRequest({ loading: false }));

        } catch (error) {
            dispatch(moviesActions.getMoviesRequest({ loading: false }));
        }
    }
}

function searchMovies(searchConditions) {
    const apiKey = context.production.environment.REACT_APP_API_KEY
    return async (dispatch) => {
        try {
            dispatch(moviesActions.getMoviesRequest({ loading: true }));

            let url = `/movie/popular?api_key=${apiKey}&language=en-US`;
            if (searchConditions !== undefined) {

                if (searchConditions.searchName !== '') {
                    url = `/search/movie?api_key=${apiKey}&language=en-US`;
                    url += `&query=${searchConditions.searchName}`;
                }

                if (searchConditions.fromYear !== '' || searchConditions.toYear !== '') {
                    url += `&primary_release_year=${searchConditions.fromYear}~${searchConditions.toYear}`;
                }

                if (searchConditions.genres.length > 0) {
                    url += `&genre_ids=${searchConditions.genres}`;
                }

                let page = '1';
                if (searchConditions.targetPage !== undefined) {
                    page = searchConditions.targetPage;
                }
                url += `&page=${page}`;

                if (searchConditions.sortType !== '' && searchConditions.sortDirection !== '') {
                    let sortPrefix = '';
                    let sortSuffix = '';
                    switch (searchConditions.sortType) {
                        case 'Popular': sortPrefix = 'popularity';
                            break;
                        default: sortPrefix = '';
                    }
                    switch (searchConditions.sortDirection) {
                        case 'Ascending': sortSuffix = 'asc'; break;
                        case 'Descending': sortSuffix = 'desc'; break;
                        default: sortSuffix = '';
                    }
                    if (sortPrefix !== '' && sortSuffix !== '') {
                        url += '$sort_by=' + sortPrefix + '.' + sortSuffix;
                    }
                }
            }

            const searchMovie = await api.get(url);
            dispatch(moviesActions.setSearchMovies({ data: searchMovie.data }));

            dispatch(moviesActions.getMoviesRequest({ loading: false }));

        } catch (error) {
            dispatch(moviesActions.getMoviesRequest({ loading: false }));
        }
    }
}

function setMovieSearchCondition(setConditions) {
    return (dispatch) => {
        dispatch(moviesActions.setMovieSearchCondition({ data: setConditions }));
    }
}

export const movieAction = {
    getMovies, getMovie, setLoading, setMovieId, searchMovies, setMovieSearchCondition
}