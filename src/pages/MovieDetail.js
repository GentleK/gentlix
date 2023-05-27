import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import MovieTrailer from '../components/MovieTrailer';
import MovieTrailerList from '../components/MovieTrailerList';
import MovieCard from '../components/MovieCard';
import { Col, Container, Row, Badge, Modal, Button, Tabs, Tab } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faFilm } from '@fortawesome/free-solid-svg-icons'

const MovieDetail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const { movieId, selectedItem, movieTrailer, loading, reviewsMovie, recommendationsMovie } = useSelector(state => state.movie)
  let imgSrc = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedItem?.poster_path}`;

  let reviewTitle = `REVIEWS (${reviewsMovie.results?.length})`;
  let recommendationTitle = `RELATED MOVIES (${recommendationsMovie.results?.length})`;

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const handleTrailerClose = () => setShowTrailer(false);
  const handleTrailerShow = () => {
    setTrailerKey(movieTrailer.results[0].key);
    setShowTrailer(true);
  }

  useEffect(() => {
    dispatch(movieAction.getMovie(id));
    window.scrollTo(0, 0);
  }, [movieId])

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
      <div className='movieDetail-main'>
        <Modal show={showTrailer} fullscreen={true} onHide={handleTrailerClose}>
          <Modal.Body className='trailerModal-body'>
            <MovieTrailer movieTrailerKey={trailerKey} />
            <div>
              <MovieTrailerList movieTrailer={movieTrailer} selectedKey={trailerKey} setTrailerKey={setTrailerKey} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleTrailerClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Container>
          <Row style={{ width: '80%' }}>
            <Col>
              <div className='movieDetail-img'><img width={300} height={450} src={imgSrc} /></div>
            </Col>
            <Col>
              <div>
                {selectedItem.genres.map((item) => (
                  <Badge bg="primary" style={{ 'margin-right': '5px' }}>
                    {item.name}
                  </Badge>
                ))}
              </div>
              <div><h1>{selectedItem.title}</h1></div>
              <div>
                <span style={{ 'padding-right': '10px' }}><FontAwesomeIcon icon={faThumbsUp} /> {selectedItem.vote_average} </span>
                <span style={{ 'padding-right': '10px' }}><FontAwesomeIcon icon={faUsers} /> {selectedItem.vote_count} </span>
                <span>{selectedItem.adult ? <Badge bg="danger">18금</Badge> : <Badge bg="warning">ALL</Badge>}</span>
              </div>
              <div><hr /></div>
              <div><h7>{selectedItem.overview}</h7></div>
              <div><hr /></div>
              <div><Badge bg="danger" style={{ width: '100px' }}>Budget</Badge> {selectedItem.budget}</div>
              <div><Badge bg="danger" style={{ width: '100px' }}>Revenue</Badge> {selectedItem.revenue}</div>
              <div><Badge bg="danger" style={{ width: '100px' }}>Release Day</Badge> {selectedItem.release_date}</div>
              <div><Badge bg="danger" style={{ width: '100px' }}>Run Time</Badge> {selectedItem.runtime}</div>
              <div><hr /></div>
              {movieTrailer.results?.length > 0 ? <div onClick={handleTrailerShow} style={{ cursor: 'pointer', width: 'fit-content' }}><FontAwesomeIcon icon={faFilm} /> Watch Trailer</div> : ''}
            </Col>
          </Row>
          <Row style={{ width: '80%', 'padding-left': '5vw', 'margin-top': '10px' }}>
            <Col>
              <Tabs
                defaultActiveKey="REVIEWS"
                id="uncontrolled-tab-example"
                className="movie-detail-tabs"
              >
                <Tab className='movie-detail-tab' eventKey="REVIEWS" title={reviewTitle}>
                  {reviewsMovie.results.map((item) => (
                    <div className='review-main'>
                      <div className='review-author'>{item.author}</div>
                      <div>{item.content}</div>
                      <div><hr /></div>
                    </div>
                  ))}
                </Tab>
                <Tab className='movie-detail-tab' eventKey="RELATED MOVIES" title={recommendationTitle}>
                  <Container>
                    <Row style={{ 'padding-top': '20px', 'padding-bottom': '20px' }}>
                      {recommendationsMovie.results.map((item) => (
                        <Col style={{ 'padding-top': '20px', display: 'flex', 'justify-content': 'center' }}><MovieCard item={item} className='wide-card' /></Col>
                      ))}
                    </Row>
                  </Container>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MovieDetail
