import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import MovieDetail from '../pages/MovieDetail';

const MovieDetailPrivate = () => {
    const { authenticate } = useSelector((state) => state.auth);
    return authenticate?<MovieDetail />:<Navigate to='/login' />;
}

export default MovieDetailPrivate
