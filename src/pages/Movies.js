import React from 'react'
import MoviesSort from '../components/MoviesSort';
import MovieCardList from '../components/MovieCardList';
import MoviesFilter from '../components/MoviesFilter';
import { Col, Container, Row } from 'react-bootstrap'

const Movies = () => {
  return (
    <div>
      <Container className='movies-main-container'>
        <Row>
          <Col className='movies-sort-col'>
            <div style={{ paddingTop: '20px', paddingBottom: '10px' }}><MoviesSort /></div>
            <div><MoviesFilter /></div>
          </Col>
          <Col>
            <MovieCardList />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Movies
