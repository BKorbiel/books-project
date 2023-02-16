import React, {useState} from 'react';
import {Button, Popover, List, ListItemButton, ListItemText} from '@mui/material';
import {useDispatch} from 'react-redux';
import {addBookToList} from '../actions/profiles';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToList = ({bookId, title, thumbnail}) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const [showLists, setShowLists] = useState(false);
	const dispatch = useDispatch();
	const ref = React.useRef();
	if (!user)
		return null;

	const add = (list) => {
	    dispatch(addBookToList(user.result._id, {bookId: bookId, title: title, thumbnail: thumbnail, list: list}));
	    setShowLists(false);
  }

	return (
		<>
			<Button ref={ref} size="small" color="inherit" onClick = {() => setShowLists((prev) => !prev)}>
	        	<PlaylistAddIcon/>
	        	&nbsp; Add to list
	      	</Button>
	      	<Popover anchorEl={ref.current} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} open={showLists} onClose={() => setShowLists(false)}>
	        	<List component="div" disablePadding>
	          		<ListItemButton sx={{ pl: 4 }} onClick={() => add("booksToRead")}>
	            		<ListItemText primaryTypographyProps={{fontSize: 15}} primary="To read" />
	          		</ListItemButton>
	          		<ListItemButton sx={{ pl: 4 }} onClick={() => add("booksRead")}>
	            		<ListItemText primaryTypographyProps={{fontSize: 15}} primary="Books read" />
	          		</ListItemButton>
	          		<ListItemButton sx={{ pl: 4 }} onClick={() => add("favoriteBooks")}>
	            		<ListItemText primaryTypographyProps={{fontSize: 15}} primary="Favorite" />
	          		</ListItemButton>
	       		</List>
	      	</Popover>
      	</>
	);
};

export default AddToList;