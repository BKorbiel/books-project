import * as api from '../api';
import {START_LOADING, END_LOADING, FETCH_PROFILE, UPDATE_PROFILE} from '../constants/actionTypes';


export const getProfile = (id) => async (dispatch) => {
	try {
		dispatch({type: START_LOADING});
		const {data} = await api.fetchProfile(id);
		dispatch({type: FETCH_PROFILE, payload: data});
		dispatch({type: END_LOADING});

	} catch(error) {
		console.log(error);
	}
}

export const addBookToList = (user_id, data) => async (dispatch) => {
	try {
		await api.addToList(user_id, data);
	} catch (error) {
		console.log(error);
	}
}

export const deleteBookFromList = (user_id, bookId, listName) => async (dispatch) => {
	try {
		await api.deleteBookFromList(user_id, listName, bookId);
	} catch (error) {
		console.log(error);
	}
}

export const editName = (user_id, newName) => async (dispatch) => {
	try {
		const {data} = await api.editName(user_id, {newName});
		dispatch({type: UPDATE_PROFILE, payload: data});
	} catch(error) {
		console.log(error);
	}
}

export const editPicture = (user_id, newPicture) => async (dispatch) => {
	try {
		const {data} = await api.editPicture(user_id, {newPicture});
		dispatch({type: UPDATE_PROFILE, payload: data});
	} catch(error) {
		console.log(error);
	}
}