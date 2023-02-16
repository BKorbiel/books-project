import {combineReducers} from 'redux';
import books from './books';
import auth from './auth';
import profile from './profile';

export default combineReducers({
	books, auth, profile,
});