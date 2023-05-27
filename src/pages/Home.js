import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector(state => state.movie)

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, [])


  if (loading) {
    return (
      <div className='home-spinner'>
        <ClipLoader
          color="#FFFFFF"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  } else {
    return (
      <div className='home-main'>
        <Banner movie={popularMovies.results[0]} />
        <div className='movies'>
          <h2>Top Popular Movie</h2>
          <MovieSlide movies={popularMovies} />
          <h2>Top Rated Movie</h2>
          <MovieSlide movies={topRatedMovies} />
          <h2>Up Coming Movie</h2>
          <MovieSlide movies={upComingMovies} />
        </div>
      </div>
    )
  }
}

export default Home
