import React, {useState, useEffect} from 'react';
import Book from './Book/Book';
import {useSelector} from 'react-redux';
import {Grid, CircularProgress} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getBooksBySearch} from '../../actions/books';

const Books = () => {
	const {books, isLoading} = useSelector((state) => state.books);

	const location=useLocation();
	const dispatch = useDispatch();


	useEffect(() => {
		const query = new URLSearchParams(location.search);
		const search = query.get("searchQuery") || '';
		const subject = query.get("subject") || '';
		const author = query.get("author") || '';
		const page = query.get("page");

		dispatch(getBooksBySearch({ search: search, subject: subject, author: author, page: page }));

	}, [location.search]);

	if(!books?.length && !isLoading) return 'No matching books';

	return (
		isLoading ? <CircularProgress /> : (
			<Grid container alignItems="stretch" spacing={3}>
				{books.map((book) => (
					<Grid key={book.id} item xs={12} sm={6} md={4}>
						<Book book={book}/>
					</Grid>
				))}
			</Grid>
		)
	);
};

export default Books;
