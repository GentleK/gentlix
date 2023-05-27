import React from 'react'
import YouTube from 'react-youtube';

const MovieTrailer = ({ movieTrailerKey }) => {
    const opts = {
        playerVars: {
            height: '100%',
            width: '100%',
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div style={{ height: '50vh' }}>
            <YouTube className='youtube-main' videoId={movieTrailerKey} opts={opts} />;
        </div>
    )
}

export default MovieTrailer
