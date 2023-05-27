import React from 'react'
import MovieCard from './MovieCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MovieSlide = ({ movies }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <Carousel responsive={responsive}>
                {movies.results.map((item) => (<MovieCard item={item} className='card' />))}
            </Carousel>
        </div>
    )
}

export default MovieSlide
