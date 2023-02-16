import React, {useEffect, useState} from 'react';
import {Paper, TextField, Typography, CircularProgress, Divider, Button, List, Avatar} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile, editName, editPicture} from '../../actions/profiles';
import moment from 'moment';
import {Edit} from '@mui/icons-material';
import BookList from './BookList';
import FileBase from 'react-file-base64';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import useStyles from './styles';



const Profile = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const {isLoading, profile} = useSelector((state) => state.profile);
	const {id} = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();

	const [changingName, setChangingName] = useState(false);
	const [newName, setNewName] = useState(null);

	const [changingPicture, setChangingPicture] = useState(false);
	const [newPicture, setNewPicture] = useState(null);

	useEffect(() => {
		dispatch(getProfile(id));
	}, [id]);

	//if user==profile?

	if (!profile) { 
    	return null;
	}
		if (isLoading) {
		return ( 
		  <Paper elevation={6}>
		    <CircularProgress size="7em"/>
		  </Paper>
		);
	}

	const changeName = () => {
		dispatch(editName(user.result?._id, newName));
		setChangingName(false);
	}

	const changePicture = () => {
		dispatch(editPicture(user.result?._id, newPicture));
		setChangingPicture(false);
	}

	return (
	    <Paper className={classes.paper} elevation={6}>
          	<div className={classes.profile}>
              	{changingPicture ? 
              		<>
              			<FileBase
							type="file"
							multiple={false}
							onDone={({base64}) => setNewPicture(base64)}
						/>
						<Button style={{margin: '10px'}} color="primary" disabled={!newPicture} variant="contained" onClick={changePicture}>
							Change picture
						</Button>
						<Button style={{margin: '10px'}} color="error" variant="contained" onClick={() => setChangingPicture(false)}>
							Cancel
						</Button>
              		</>
              	:
              		<div className={classes.avatar}>
              			<Avatar alt={profile.name} sx={{ width: 56, height: 56 }} src={profile.picture}>{profile.name.charAt(0)}</Avatar> 
              			{user?.result?._id==id && (
			              	<Button style={{color: 'black'}} onClick={() => setChangingPicture(true)}>
								<Edit fontSize="default"/>Edit
							</Button>
						)}
					</div>
				}
				<br/>
				{changingName ? 
					<> 
						<TextField label="New name" onChange={(e) => setNewName(e.target.value)}/>
						<Button style={{margin: '10px'}} color="primary" disabled={!newName} variant="contained" onClick={changeName}>
							Change name
						</Button>
						<Button style={{margin: '10px'}} color="error" variant="contained" onClick={() => setChangingName(false)}>
							Cancel
						</Button>
					</>
				:
					<div className={classes.name}>
		          		<Typography sx={{maxWidth: "100%"}} variant="h3">{profile.name}</Typography>
		          		{user?.result?._id==id && (
			          		<Button style={{color: 'black'}} onClick={() => setChangingName(true)}>
								<Edit fontSize="default"/>Edit
							</Button>
						)}
					</div>
				}
          	</div>
          	<br/>
          	<Typography style={{fontSize: 13}}>Account created {moment(profile.createdAt).fromNow()}</Typography>
          	<Divider style={{ margin: '20px 0' }} />
          	<div>
          		<Typography variant="h5">User's lists</Typography>
          		<List
			      className={classes.list}
			      component="nav"
			    >
			      <BookList list={profile.booksToRead} name={"Books to read"} user={user} id={id}/>
			      <BookList list={profile.booksRead} name={"Books read"} user={user} id={id}/>
			      <BookList list={profile.favoriteBooks} name={"Favorite books"} user={user} id={id}/>
			    </List>
          	</div>
	    </Paper>
  	);
};

export default Profile;