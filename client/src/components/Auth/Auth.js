import React, {useState, useEffect} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@mui/material';
import useStyles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin, signup, googleSignIn} from '../../actions/auth';

const Auth = () => {
	const classes = useStyles();
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState({firstName:'', lastName:'', email:'', password:'', confirmPassword:''});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if(isSignUp) {
			dispatch(signup(formData, navigate, setError));
		}
		else {
			dispatch(signin(formData, navigate, setError));

		}
	};
	const handleChange = (e) => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleShowPassword = () => setShowPassword((prev) => !prev);

	const switchMode = () => {
		setError(null);
		setIsSignUp((prev) => !prev);
		setShowPassword(false);
	};

	const handleCallbackRespons = async (res) => {
		const token = res?.credential;
		try {
			dispatch(googleSignIn({token}, navigate, setError));
		} catch (error) {
			console.log(error);
		}
	};

	const user = JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		if(user) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: "855468646875-a53unsfr10rp9qbpon6jt5birovrdt7d.apps.googleusercontent.com",
			callback: handleCallbackRespons
		});
		google.accounts.id.renderButton(
			document.getElementById("googleSignIn"),
			{theme: "outline", size: "small"}
		);
	}, []);

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input name="firstName" label="First name" handleChange={handleChange} autoFocus half/>
								<Input name="secondName" label="Second name" handleChange={handleChange} half/>
							</>
						)}
						<Input name="email" label="Email" handleChange={handleChange} type="email"/>
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword}/>
						{isSignUp && (<Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type={showPassword ? "text" : "password"}/>)}
					</Grid>
					<br/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{isSignUp ? "Sign Up" : "Sign In"}
					</Button>
					{
						error ? <Typography style={{fontSize: 13, color: "red"}}>{error}</Typography> : null
					}
					<br/>
					<div id="googleSignIn"></div>
					<br/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;