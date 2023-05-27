import React from 'react'
import { Tooltip, Badge } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const MovieTrailerList = ({ movieTrailer, selectedKey, setTrailerKey }) => {
    return (
        <div className='movieTrailer-list'>
            {movieTrailer.results.map((item, index) => (
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">{item.name}</Tooltip>}
                >
                    <Badge pill className='ms-1' bg={selectedKey == item.key ? 'primary' : 'secondary'} onClick={() => setTrailerKey(item.key)} style={{ 'margin-right': '5px', cursor: 'pointer' }}>{index + 1}</Badge>
                </OverlayTrigger>
            ))}
        </div>
    )
}

export default MovieTrailerList
