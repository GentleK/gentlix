import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Accordion, Form } from 'react-bootstrap'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const MoviesFilter = () => {
    const { genreList, searchName, genres, sortType, sortDirection } = useSelector(state => state.movie);
    const dispatch = useDispatch();

    const date = new Date();
    let defaultFromYear = 1990;
    let defaultToYear = date.getFullYear();
    const [fromYear, setFromYear] = useState(defaultFromYear);
    const [toYear, setToYear] = useState(defaultToYear);

    const changeYearValue = (value) => {
        setFromYear(value[0]);
        setToYear(value[1]);
        const setConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection };
        dispatch(movieAction.setMovieSearchCondition(setConditions));
    }

    const changeGenres = (item) => {
        const genres = {
            id: item.target.id,
            checked: item.nativeEvent.srcElement.checked
        }
        const setConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection };
        dispatch(movieAction.setMovieSearchCondition(setConditions));
    }

    useEffect(() => {
        const searchConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection };
        dispatch(movieAction.searchMovies(searchConditions));
    }, [fromYear, toYear, genres])

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='sort-accordion-header'>Filter</Accordion.Header>
                    <Accordion.Body className='filter-accordion-body'>
                        <div className='year-filter-title'>YEAR Filter</div>
                        <div className='year-filter-item'>
                            <div className='year-filter-item-title'>From:</div>
                            <div><b>{fromYear}</b></div>
                            <div className='year-filter-item-title'>, To:</div>
                            <div><b>{toYear}</b></div>
                        </div>
                        <RangeSlider min={defaultFromYear} max={defaultToYear} defaultValue={[defaultFromYear, defaultToYear]} onInput={changeYearValue} />
                        <div style={{ marginTop: '30px' }}><hr /></div>
                        <div className='year-filter-title'>Genres</div>
                        <div className='genres-check-group'>
                            {genreList.map((item) => (
                                <Form.Check
                                    type="checkbox"
                                    id={item.id}
                                    label={item.name}
                                    className='genres-check'
                                    onClick={(item) => changeGenres(item)}
                                />
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default MoviesFilter
