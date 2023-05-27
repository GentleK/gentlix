import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Col, Container, Row, Pagination } from 'react-bootstrap'

const PageNavigation = ({ searchMovies }) => {
    const dispatch = useDispatch();
    const { searchName, fromYear, toYear, genres, sortType, sortDirection } = useSelector(state => state.movie);

    const currentPage = searchMovies.page;
    const page_group_number = 10;
    const total_pages = searchMovies.total_pages > 500 ? 500 : searchMovies.total_pages;
    const page_group = Math.ceil(currentPage / page_group_number);
    let last_page = page_group_number * page_group;
    if (last_page > total_pages) {
        last_page = total_pages;
    }
    const first_page = last_page - (page_group_number - 1) < 1 ? 1 : last_page - (page_group_number - 1);
    let page_group_list = [];
    for (let inx = first_page; inx <= last_page; inx++) {
        page_group_list = [...page_group_list, inx];
    }

    const moveToPage = (targetPage) => {
        const searchConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection, targetPage };
        dispatch(movieAction.searchMovies(searchConditions));
    }

    return (
        <div className='page-navigation'>
            <Container>
                <Row>
                    <Col>
                        <Pagination size='sm'>
                            {page_group > 1 ? <Pagination.First onClick={() => moveToPage('1')} /> : ''}
                            {currentPage > 1 ? <Pagination.Prev onClick={() => moveToPage(currentPage - 1)} /> : ''}
                            {page_group_list.map((item) => (
                                (item === currentPage) ?
                                    <Pagination.Item onClick={() => moveToPage(item)} active>{item}</Pagination.Item>
                                    :
                                    <Pagination.Item onClick={() => moveToPage(item)} >{item}</Pagination.Item>
                            ))}
                            {currentPage < total_pages ? <Pagination.Next onClick={() => moveToPage(currentPage + 1)} /> : ''}
                            {page_group < Math.ceil(total_pages / page_group_number) ? <Pagination.Last onClick={() => moveToPage(total_pages)} /> : ''}
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PageNavigation
