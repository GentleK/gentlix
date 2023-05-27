import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from './reducers/authenticateReducer'
import moviesReducer from './reducers/moviesReducer'

const store = configureStore({
    reducer: {
        auth: authenticateReducer,
        movie: moviesReducer
    }
})

export default store;