import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../redux/actions/movieAction';
import { Accordion, DropdownButton, Dropdown } from 'react-bootstrap'

const MoviesSort = () => {
    const dispatch = useDispatch();
    const { searchName, fromYear, toYear, genres } = useSelector(state => state.movie)
    const [sortType, setSortType] = useState('Sort Type');
    const [sortDirection, setSortDirection] = useState('Ascending');

    const selectSortType = (eventKey) => {
        setSortType(eventKey);
    }
    const selectSortDirection = (eventKey) => {
        setSortDirection(eventKey);
    }

    useEffect(() => {
        if ('Sort Type' !== sortType) {
            const searchConditions = { searchName, fromYear, toYear, genres, sortType, sortDirection };
            dispatch(movieAction.searchMovies(searchConditions));
        }
    }, [sortType, sortDirection])

    return (
        <div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='sort-accordion-header'>Sort</Accordion.Header>
                    <Accordion.Body className='sort-accordion-body'>
                        <div className='sort-accordion-items'>
                            <DropdownButton variant="dark" id="sort-type" title={sortType} onSelect={(eventKey) => selectSortType(eventKey)}>
                                <Dropdown.Item as="button" eventKey='Popular'>Popular</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='Release Day'>Release Day</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='Vote'>Vote</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='Revenue'>Revenue</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton variant="dark" id="sort-direction" title={sortDirection} onSelect={(eventKey) => selectSortDirection(eventKey)}>
                                <Dropdown.Item as="button" eventKey='Ascending'>Ascending</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='Descending'>Descending</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default MoviesSort
