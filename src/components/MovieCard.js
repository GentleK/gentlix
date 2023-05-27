import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { movieAction } from '../redux/actions/movieAction';
import { Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const MovieCard = ({ item, className }) => {
    const { genreList } = useSelector((state) => state.movie);
    const { authenticate } = useSelector((state) => state.auth);
    let overlayClassName = authenticate ? 'overlay-authenticate' : 'overlay';
    let verticalCard = className === 'vertical-card' ? true : false;
    let iconImage = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`;
    let backgroundImage = `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getMovieDetail = () => {
        if (authenticate) {
            dispatch(movieAction.setLoading(true));
            dispatch(movieAction.setMovieId(item.id));
            navigate(`/movies/${item.id}`);
        }
    }
    return (
        <div>
            {verticalCard ?
                <div className={className} style={{ backgroundImage: backgroundImage }} >
                    <div className={authenticate ? 'vertical-card-overlay-authenticate' : 'vertical-card-overlay'} onClick={getMovieDetail}>
                        <div className='overlay-title'>
                            <div style={{ display: 'flex' }}>
                                <img src={iconImage} className='icon-image' />
                                <div style={{ 'padding-left': '5px' }}>
                                    <div><h7>{item.title}</h7></div>
                                    <div style={{ color: '#5CB3FF', fontSize: '12px' }}>{item.release_date?.substring(0, 4)}</div>
                                </div>
                            </div>
                            <div style={{ paddingTop: '20px' }}>{item.genre_ids.map(id => (
                                <Badge bg="primary" style={{ 'margin-right': '5px' }}>
                                    {genreList.find((item) => item.id === id).name}
                                </Badge>
                            ))}</div>
                            <div style={{ paddingTop: '20px', color: '#98AFC7', fontSize: '12px' }}>
                                {item.overview.length < 200
                                    ? item.overview
                                    : item.overview.slice(0, 200) + '...'}
                            </div>
                        </div>
                        <div style={{ paddingTop: '20px' }}>
                            <span style={{ paddingRight: '10px' }}><FontAwesomeIcon icon={faThumbsUp} /> {item.vote_average} </span>
                            <span style={{ paddingRight: '10px' }}><FontAwesomeIcon icon={faUsers} /> {item.vote_count} </span>
                            <span>{item.adult ? <Badge bg="danger">18금</Badge> : <Badge bg="warning">ALL</Badge>}</span>
                        </div>
                    </div>
                </div>
                :
                <div className={className}
                    style={{
                        backgroundImage:
                            "url(" +
                            `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
                            ")",
                    }}>
                    <div className={overlayClassName} onClick={getMovieDetail}>
                        <div className='overlay-title'>
                            <div><h7>{item.title}</h7></div>
                            <div>{item.genre_ids.map(id => (
                                <Badge bg="primary" style={{ 'margin-right': '5px' }}>
                                    {genreList.find((item) => item.id === id).name}
                                </Badge>
                            ))}</div>
                        </div>
                        <div>
                            <span style={{ paddingRight: '10px' }}><FontAwesomeIcon icon={faThumbsUp} /> {item.vote_average} </span>
                            <span style={{ paddingRight: '10px' }}><FontAwesomeIcon icon={faUsers} /> {item.vote_count} </span>
                            <span>{item.adult ? <Badge bg="danger">18금</Badge> : <Badge bg="warning">ALL</Badge>}</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieCard
