import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
	if(localStorage.getItem('user')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
	}
	return req;
});

export const fetchBooksBySearch = (searchQuery) => API.get(`/backendbooks/search?searchQuery=${searchQuery.search}&subject=${searchQuery.subject}&author=${searchQuery.author}&page=${searchQuery.page}`);
export const fetchBook = (id) => API.get(`/backendbooks/${id}`);
export const comment = (comment) => API.post(`/backendbooks/${comment.book_id}/commentBook`, comment);
export const likeComment = (user_id, book_id, comment_id) => API.patch(`/backendbooks/${book_id}/likeComment/${comment_id}`, {user_id});
export const deleteComment = (book_id, comment_id) => API.delete(`/backendbooks/${book_id}/deleteComment/${comment_id}`);
export const editComment = (comment) => API.patch(`/backendbooks/${comment.book_id}/editComment/`, comment);

export const googleSignIn = (token) => API.post('/backendusers/googlesignin', token);
export const signIn = (formData) => API.post('/backendusers/signin', formData);
export const signUp = (formData) => API.post('/backendusers/signup', formData);

export const fetchProfile = (id) => API.get(`/backendprofiles/${id}`);
export const addToList = (user_id, data) => API.patch(`/backendprofiles/${user_id}/addtolist`, data);
export const deleteBookFromList = (user_id, listName, bookId) => API.delete(`/backendprofiles/${user_id}/deleteBookFromList/${listName}/${bookId}`);
export const editName = (user_id, newName) => API.patch(`/backendprofiles/${user_id}/editName`, newName);
export const editPicture = (user_id, newPicture) => API.patch(`/backendprofiles/${user_id}/editPicture`, newPicture);