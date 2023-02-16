import React, {useState} from 'react';
import {ExpandMore, ExpandLess, Delete} from '@mui/icons-material';
import {Typography, Collapse, ListItemIcon, ListItemButton, ListItemText, List, ListItem} from '@mui/material';
import {deleteBookFromList} from '../../actions/profiles';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useStyles from './styles';

const BookList = ({list, name, user, id}) => {
	const [books, setBooks] = useState(list);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const deleteItem = (bookId) => {
		dispatch(deleteBookFromList(id, bookId, name));
		
		const index = books.findIndex((book) => book.bookId==bookId);
		setBooks(books.slice(0, index).concat(books.slice(index+1)));
	}

	return (
		<>
			<ListItemButton onClick = {() => {setOpen((prev) => !prev)}}>
		    	<ListItemText primary={name}/>
		    	{open ? <ExpandLess/> : <ExpandMore/>}
		  	</ListItemButton>
		  	<Collapse in={open} timeout="auto" unmountOnExit>
		  		{books?.length ? 
		  		<List component="div" disablePadding>
			  		{books.map((book, i) => (
			  			<div key={i} className={classes.book}>
			  				<ListItem sx={{margin: 0, padding: 0}}>
				          		<ListItemButton onClick={() => navigate(`/books/${book.bookId}`)}>
				            		<ListItemIcon>
				            			<img style={{ width: 53, height: 80}} src={book.thumbnail}/>
				            		</ListItemIcon>
				            		<ListItemText primary={book.title}/>
				          		</ListItemButton>
			            	</ListItem>
		            		{user?.result?._id==id && (
		            			<ListItemButton onClick={() => deleteItem(book.bookId)}>
			            			<ListItemIcon>
			            				<Delete/>
			            			</ListItemIcon>
			            		</ListItemButton>
		            		)}
		            	</div>
			  		))}
		        </List>
		    	: <Typography><strong>User doesn't have any book in this list yet.</strong></Typography>}
		  	</Collapse>
		</>
	  );
};

export default BookList;