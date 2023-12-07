import {configureStore, combineReducers} from '@reduxjs/toolkit';
import loginslice from './slices/login/slice'
import  profileclice from "./slices/artistProfile/slice"
import getworksearch from "./slices/home/slice"
import commentslice from "./slices/comment/slice"
import shopingslice from "./slices/shoping/slice"





const rootreducer=combineReducers({loginslice,profileclice,getworksearch,commentslice,shopingslice}) 
const Store =configureStore({reducer:rootreducer});
export default Store

