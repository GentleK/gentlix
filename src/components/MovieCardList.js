import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import MovieCard from '../components/MovieCard';
import PageNavigation from './PageNavigation';
import { Col, Container, Row } from 'react-bootstrap'
import ClipLoader from "react-spinners/ClipLoader";

const MovieCardList = () => {
    const dispatch = useDispatch();
    const { searchMovies, loading, searchName, fromYear, toYear, genres, sortType, sortDirection } = useSelector(state => state.movie)

    useEffect(() => {
        const searchConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection };
        dispatch(movieAction.searchMovies(searchConditions));
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
            <div>
                <Container>
                    <Row>
                        {searchMovies.results?.map((item) => (<Col className='movies-card-list'><MovieCard item={item} className='vertical-card' /></Col>))}
                    </Row>
                </Container>
                <PageNavigation searchMovies={searchMovies} />
            </div>
        )
    }
}

export default MovieCardList
