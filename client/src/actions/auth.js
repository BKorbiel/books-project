import * as api from '../api';
import {AUTH} from '../constants/actionTypes';

export const signin = (formData, navigate, setError) => async (dispatch) => {
	try {
		const {data} = await api.signIn(formData);
		dispatch({type: AUTH, data});
		navigate("/");
	}
	catch(error) {
		console.log(error);
		setError(error?.response?.data?.message);
	}
}

export const signup = (formData, navigate, setError) => async (dispatch) => {
	try {
		const {data} = await api.signUp(formData);
		dispatch({type: AUTH, data});
		navigate("/");
	}
	catch(error) {
		console.log(error);
		setError(error?.response?.data?.message);
	}
}

export const googleSignIn = (token, navigate, setError) => async (dispatch) => {
	try {
		const {data} = await api.googleSignIn(token);
		dispatch({type: AUTH, data});
		navigate("/");
	}
	catch(error) {
		console.log(error);
		setError(error?.response?.data?.message);
	}
}