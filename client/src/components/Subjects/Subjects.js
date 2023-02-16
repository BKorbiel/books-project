import React, {useEffect} from 'react';
import Subject from './Subject';
import { useDispatch } from 'react-redux';
import {Container, Grow, Grid } from '@mui/material'
import {getBooksBySearch} from '../../actions/books';
import {useNavigate} from 'react-router-dom';

const Subjects = () => {
	const dispatch= useDispatch();
	const navigate = useNavigate();

	const handleClick = (name) => {
		navigate(`/books/search?subject=${name}&page=1`);
	};

	return (
		<Grid container alignItems="stretch" spacing={3}>
			<Grid item xs={12} sm={6} onClick={() => handleClick("adventure")}>
				<Subject name="Adventure" image={"https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("classic")}>
				<Subject name="Classic" image={"https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("thriller")}>
				<Subject name="Thriller" image={"https://images.pexels.com/photos/10481292/pexels-photo-10481292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("fantasy")}>
				<Subject name="Fantasy" image={"https://images.pexels.com/photos/1103972/pexels-photo-1103972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("romance")}>
				<Subject name="Romance" image={"https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("horror")}>
				<Subject name="Horror" image={"https://images.pexels.com/photos/35888/amazing-beautiful-breathtaking-clouds.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("nonfiction")}>
				<Subject name="Non Fiction" image={"https://images.pexels.com/photos/5754271/pexels-photo-5754271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
			<Grid item xs={12} sm={6} onClick={() => handleClick("drama")}>
				<Subject name="Drama" image={"https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
			</Grid>
		</Grid>
	);
};

export default Subjects;