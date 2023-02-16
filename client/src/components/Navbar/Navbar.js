import React, {useState, useEffect} from 'react';
import { AppBar, Container, Avatar, Typography, Toolbar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';

const Navbar = () => {
	const classes=useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const logout = () => {
		dispatch({type: 'LOGOUT'});
		navigate('/');
		setUser(null);
	};

	useEffect(()  => {
		const token = user?.token;

		if(token) {
			const decodedToken = jwt_decode(token);
			if(decodedToken.exp * 1000 < new Date().getTime())
			{
				logout();
			}
		}

		setUser(JSON.parse(localStorage.getItem('user')));
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Toolbar className={classes.toolBar}>
				<div className={classes.brandContainer}> 
					<Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Books</Typography>
					<img className={classes.image} src="https://img.freepik.com/free-vector/stack-books-graphic-illustration_53876-8852.jpg?w=740&t=st=1672861468~exp=1672862068~hmac=1344547574369d0d81a2bcbe59c39102dd411b3604472212bd720b4830820901" alt="books" height="60"/>
				</div>
				{user ? (
					<>
						<div className={classes.profile} onClick = {() => navigate(`/profile/${user.result._id}`)}>
							<Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar> 
							&nbsp;
							<Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
						</div>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
					</>
				) : (
					<Button style={{marginLeft: "auto"}} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;