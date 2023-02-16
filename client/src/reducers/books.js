import {START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_BOOK, UPDATE_COMMENTS, DELETE_COMMENT } from '../constants/actionTypes';
export default (state = {isLoading: true, books: [], comments:[]}, action) => {
	switch (action.type) {
		case START_LOADING:
			return {...state, isLoading:true};
		case END_LOADING:
			return {...state, isLoading:false};
		case FETCH_BOOK:
			return {...state, book: action.payload.book, comments: action.payload.comments};
		case FETCH_BY_SEARCH:
			return {...state, books: action.payload.data, numberOfPages: action.payload.numberOfPages};
		case UPDATE_COMMENTS:
			return {...state, comments: action.payload};
		case DELETE_COMMENT:
			return {...state, comments: state.comments.filter((comment) => comment._id!=action.payload)};
		default:
			return state;
	}
}