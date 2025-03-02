import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postSlice from './postSlice'

const store=configureStore({
    reducer: {
        auth:authReducer,
        //  post:postReducer,
    }
})

export default store;