import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authenticateAction } from '../redux/actions/authenticateAction';
import { movieAction } from '../redux/actions/movieAction';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'

const Navigation = () => {
    const searchName = useRef();
    const { name, authenticate } = useSelector((state) => state.auth);
    const { fromYear, toYear, genres, sortType, sortDirection } = useSelector(state => state.movie);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const userLogout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            dispatch(authenticateAction.logoutUser());
            navigate(-1);
        }
    }

    const searchMovie = () => {
        const setConditions = { searchName: searchName.current.value };
        dispatch(movieAction.setMovieSearchCondition(setConditions));
        if ('/movies' === location.pathname) {
            const searchConditions = { searchName: searchName.current.value, fromYear, toYear, genres, sortType, sortDirection };
            dispatch(movieAction.searchMovies(searchConditions));
        } else {
            const searchConditions = { searchName: searchName.current.value };
            dispatch(movieAction.searchMovies(searchConditions));
            navigate('/movies');
        }
    }
    const enterSearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchMovie();
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img height={40} src='./images/logo.png' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', width: '85%' }}
                        navbarScroll
                    >
                        <div className='nav-item-list'>
                            <div>
                                <Link to='/' className='nav-item'>Home</Link>
                                <Link to='/movies' className='nav-item'>Movies</Link>
                            </div>
                            <div style={{ color: 'white', 'padding-right': '10px' }}>
                                {authenticate ? <a onClick={userLogout} style={{ cursor: 'pointer' }}>{name}</a> : <Link to='/login' className='nav-item'>Login</Link>}
                            </div>
                        </div>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            ref={searchName}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onKeyDown={(event) => enterSearch(event)}
                        />
                        <Button variant="outline-danger" onClick={searchMovie}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
