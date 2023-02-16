import {START_LOADING, END_LOADING, FETCH_PROFILE, UPDATE_PROFILE } from '../constants/actionTypes';
export default (state = {isLoading: true, profile: null}, action) => {
	switch (action.type) {
		case START_LOADING:
			return {...state, isLoading:true};
		case END_LOADING:
			return {...state, isLoading:false};
		case FETCH_PROFILE:
			return {...state, profile: action.payload};
		case UPDATE_PROFILE:
			const user = JSON.parse(localStorage.getItem('user'));
			user.result = action.payload;
			localStorage.setItem("user", JSON.stringify(user));
			return {...state, profile: action.payload};
		default:
			return state;
	}
}