import React, {useState} from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Box} from '@mui/material';
import {useNavigate, Link} from 'react-router-dom';
import AddToList from '../../AddToList';
import useStyles from './styles';

const Book = ({book}) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const [showLists, setShowLists] = useState(false);
	const navigate = useNavigate();
	const classes = useStyles();
	const openBook = () => {
		navigate(`/books/${book.id}`);
	}

	return (
		<Card className={classes.card}>
	      <CardMedia
	        component="img"
	        className={classes.image}
	        image={book?.volumeInfo?.imageLinks?.thumbnail || "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"}
	        alt={book?.volumeInfo?.title}
	        onClick={openBook}
	      />
	      <Box className={classes.details}>
	        <CardContent sx={{ flex: '1 0 auto' }}>
	          <Typography className={classes.title} component={Link} to={`/books/${book.id}`} variant="h5">
	            {book?.volumeInfo?.title}
	          </Typography>
	          <Typography sx={{wordWrap: "break-word"}} variant="subtitle1" color="text.secondary" component="div">
	            {book?.volumeInfo?.authors?.join(', ')}
	          </Typography>
	        </CardContent>
	        <Box className={classes.addToList}>
	        	<AddToList bookId={book.id} title={book.volumeInfo.title} thumbnail={book.volumeInfo.imageLinks?.smallThumbnail || "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"}/>
	        </Box>
	      </Box>
	    </Card>
	);
};

export default Book;
