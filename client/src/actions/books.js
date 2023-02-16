import * as api from '../api';
import {START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_BOOK, UPDATE_COMMENTS, DELETE_COMMENT} from '../constants/actionTypes';

export const getBooksBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({type: START_LOADING});
		const {data} = await api.fetchBooksBySearch(searchQuery);
		dispatch({type: FETCH_BY_SEARCH, payload: data});
		dispatch({type: END_LOADING});

	} catch(error) {
		console.log(error);
	}
}

export const getBook = (id) => async (dispatch) => {
	try {
		dispatch({type: START_LOADING});
		const {data} = await api.fetchBook(id);
		dispatch({type: FETCH_BOOK, payload: data});
		dispatch({type: END_LOADING});

	} catch(error) {
		console.log(error);
	}
}

export const createComment = (comment) => async (dispatch) => {
	try {
		const {data} = await api.comment(comment);
		dispatch({type: UPDATE_COMMENTS, payload: data});
	} catch(error) {
		console.log(error);
	}
}

export const likeComment = (user_id, book_id, comment_id) => async (dispatch) => {
	try {
		const {data} = await api.likeComment(user_id, book_id, comment_id);
		dispatch({type: UPDATE_COMMENTS, payload: data});

	} catch(error) {
		console.log(error);
	}
}

export const deleteComment = (book_id, comment_id) => async (dispatch) => {
	try {
		await api.deleteComment(book_id, comment_id);
		dispatch({type: DELETE_COMMENT, payload: comment_id});

	} catch(error) {
		console.log(error);
	}
}

export const editComment = (comment) => async (dispatch) => {
	try {
		const {data} = await api.editComment(comment);
		dispatch({type: UPDATE_COMMENTS, payload: data});

	} catch(error) {
		console.log(error);
	}
}