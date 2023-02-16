import React, {useEffect} from 'react';
import { Container} from '@mui/material';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import BookPage from './components/BookPage/BookPage';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import './index.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

const App =() => {
	const user = JSON.parse(localStorage.getItem('user'));
	return (
		<BrowserRouter>
			<Container maxWidth="xl">
				<Navbar/>
				<Routes>
					<Route path="/" exact element={<Home showSubjects={true}/>}/>
					<Route path="/books/search" exact element={<Home showSubjects={false}/>}/>
					<Route path="/books/:id" element={<BookPage/>}/>
					<Route path="/auth" exact element={<Auth/>}/>
					<Route path="/profile/:id" element={<Profile/>}/>
				</Routes>
			</Container>
		</BrowserRouter>
	);
};

export default App;