import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice';
import profileReducer from './Slices/profileSlice'
import adminReducer from './Slices/adminSlice'
//import counter from '../components/counter';

const store = configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        admin:adminReducer,
        //counter: counter,
   

    }
})

export default store
