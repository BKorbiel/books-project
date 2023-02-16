import React, {useState, useEffect} from 'react';
import {Paper, AppBar, TextField, Button, Container, Grow, Grid, Box } from '@mui/material';
import Books from '../Books/Books';
import {getBooks} from '../../actions/books';
import Subjects from '../Subjects/Subjects';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles.js';
import {useNavigate} from 'react-router-dom';

const Home = ({showSubjects}) => {
	const navigate = useNavigate();
	const classes = useStyles();

	const [searchQuery, setSearchQuery] = useState("");
	const [subject, setSubject] = useState("");
	const [author, setAuthor] = useState("");

	const searchBooks = () => {
		if(searchQuery.trim() || subject.trim() || author.trim()) {
			let search= "";
			search+=searchQuery.length ? "searchQuery="+searchQuery : "";
			search+=subject.length ? "&subject="+subject : "";
			search+=author.length ? "&author="+author : "";
			navigate(`/books/search?${search}&page=1`);
		}
	}

	const handleKeyPress = (e) => {
		if(e.code=="Enter") {
			searchBooks();
		}
	};
	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container justify="space-between" alignItems="stretch" spacing={3}>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField 
								style={{margin: '10px 0'}} 
								variant="outlined" 
								label="Search"
								fullWidth
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<TextField 
								variant="outlined" 
								label="Author"
								fullWidth
								onChange={(e) => setAuthor(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<TextField 
								style={{margin: '10px 0'}}
								variant="outlined" 
								label="Subject"
								fullWidth
								onChange={(e) => setSubject(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<Button onClick={searchBooks} variant="contained" color="primary">
								Search
							</Button>
						</AppBar>
					</Grid>
					<Grid className={classes.gridContainer} item xs={12} sm={6} md={9}>
						{!showSubjects ? <Books/> : <Subjects/>}
					</Grid>
				</Grid>
				<br/>
				{!showSubjects && 
					<Box display="flex" justifyContent="center" alignItems="center">
						<Paper elevation={6}>
							<Pagination/>
						</Paper>
					</Box>
				}
			</Container>
		</Grow>
	);
};

export default Home;