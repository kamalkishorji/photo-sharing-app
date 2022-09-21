import {combineReducers} from 'redux';
import post from './post';
import authReducer from './auth';

export const reducers = combineReducers({post,authReducer});