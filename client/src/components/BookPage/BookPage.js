import React, {useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import useStyles from './styles';
import {getBook} from '../../actions/books';
import CommentSection from './CommentSection';
import AddToList from '../AddToList';
import ReactDOM from 'react-dom';

const BookPage = () => {
  const {book, books, isLoading, comments} = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {id} = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);


  if (!book) { 
    return null;
  }
  if (isLoading) {
    return ( 
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em"/>
      </Paper>
    );
  }

  return (
    <Paper style={{padding:"20px", borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>
          <div className={classes.imageSection}>
              <img className={classes.media} src={book?.volumeInfo?.imageLinks?.thumbnail || "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"} alt={book.volumeInfo.title} />
              <br/>
              <br/>
              <AddToList bookId={book.id} title={book.volumeInfo.title} thumbnail={book.volumeInfo.imageLinks?.smallThumbnail || "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"}/>
          </div>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{book.volumeInfo.title}</Typography>
            <br/>
            <div style={{fontSize: 20, font: "Roboto"}} dangerouslySetInnerHTML={{__html: book.volumeInfo.description}}/>
            <br/>
            <Typography sx={{maxWidth: "100%"}} variant="h6"><strong>Authors:</strong> {book.volumeInfo.authors?.join(', ')}</Typography>
            <Typography sx={{maxWidth: "100%"}} variant="h6"><strong>Publisher:</strong> {book.volumeInfo.publisher}</Typography>
            <Typography sx={{maxWidth: "100%"}} variant="h6"><strong>Publish date:</strong> {book.volumeInfo.publishedDate}</Typography>
            <Typography sx={{maxWidth: "100%"}} variant="h6"><strong>Page count:</strong> {book.volumeInfo.pageCount}</Typography>
            {(book.volumeInfo.averageRating &&
              <Typography sx={{maxWidth: "100%"}} variant="h6"><strong>Google Books average rating:</strong> {book.volumeInfo.averageRating}, ({book.volumeInfo.ratingsCount} rates)</Typography>
            )}
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection book={book}/>
          </div>
      </div>
    </Paper>
  );
};

export default BookPage;