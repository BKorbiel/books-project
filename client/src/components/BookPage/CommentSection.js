import React, {useState, useEffect, useRef} from 'react';
import {Typography, TextField, Button, ButtonBase, Avatar, Divider, Select, MenuItem} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './styles';
import {createComment, likeComment, deleteComment, editComment} from '../../actions/books';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';


const CommentSection = ({book}) => {
	const classes = useStyles();
	const comments = useSelector((state) => state.books.comments) || [];
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(10);
	const [editing, setEditing] = useState(null);
	const user = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();
	const editRef = useRef();
	const navigate = useNavigate();

	const handleClick = async () => {
		if (editing) {
			dispatch(editComment({book_id: book.id, comment_id: editing, message: comment, rating: rating}));
			setComment('');
			setRating(10);
			setEditing(null);
		}	
		else {
			dispatch(createComment({book_id: book.id, message: comment, rating: rating, creator_name: user.result.name, creator_picture: user.result.picture, creator_id: user.result._id}));
			setComment('');
			setRating(10);
		}
	};

	const handleLike = async (comment_id) => {
		dispatch(likeComment(user?.result?._id, book.id, comment_id));
	};
	const handleEdit = async (comment) => {
		setEditing(comment._id);
		setComment(comment.message);
		setRating(comment.rating);
		editRef.current.scrollIntoView({behavior: 'smooth'});
	};
	const handleDelete = async (comment_id) => {
		dispatch(deleteComment(book.id, comment_id));
	};

	const handleCancel = () => {
		setEditing(null);
		setComment("");
		setRating(10);
	}

	return (
		<div className={classes.commentsOuterContainer}>
			<div className={classes.commentsInnerContainer}>
				<Typography gutterBottom variant="h6">Comments</Typography>
				{comments.map((comment, i) => (
					<div key={i}>
						<Typography gutterBottom variant="subtitle1">
							<div style={{fontSize: 13}}>{moment(comment.createdAt).fromNow()}</div>
							<ButtonBase onClick={() => navigate(`/profile/${comment.creator_id}`)}>
								<Avatar alt={comment.creator_name} src={comment.creator_picture}>{comment.creator_name.charAt(0)}</Avatar>
								&nbsp;
								<h3><strong>{comment.creator_name}</strong></h3>
							</ButtonBase>
							&nbsp;&nbsp; Rated {comment.rating}/10
							<br/>
							<div style={{fontSize: 18, wordWrap: "break-word"}}>{comment.message}</div>
							<div style={{fontSize: 14}}>{comment.likeCount.length} Likes</div>
						</Typography>
						<Button size="small" color="primary" disabled={!user?.result} onClick = {() => handleLike(comment._id)}>
							{
								comment.likeCount.find((like) => like==user?.result?._id)
								?
								"Unlike"
								:
								"Like"
							}
						</Button>
						{comment.creator_id==user?.result?._id && (
							<>
								<Button size="small" color="primary" onClick = {() => handleEdit(comment)}>
									Edit
								</Button>
								<Button size="small" color="primary" onClick = {() => handleDelete(comment._id)}>
									Delete
								</Button>
							</>
						)}
						<Divider style={{ margin: '10px 0' }} />
						<br/>
					</div>
				))}
			</div>
			{user?.result?.name ? (
				<div className={classes.writeComment} ref={editRef}>
					<Typography gutterBottom variant="h6">Write a comment</Typography>
					<TextField 
						fullWidth
						rows={4}
						variant="outlined"
						label="Comment"
						multiline
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Typography gutterBottom variant="h6">Your rating: </Typography>
					<Select value={rating} onChange={(e) => setRating(e.target.value)}>
						{
							[...Array(11)].map((x, i) => 
								<MenuItem key={i} value={i}>{i}</MenuItem>
							)
						}
					</Select>
					<Button style={{margin: '10px'}} color="primary" fullWidth disabled={!comment || !rating} variant="contained" onClick={handleClick}>
						{editing ? "Edit comment" : "Comment"}
					</Button>
					{editing && (
						<Button style={{margin: '10px'}} color="error" fullWidth variant="contained" onClick={handleCancel}>
							Cancel
						</Button>
					)}
				</div>
			) : <Typography>Sign in to write comments!</Typography>}
		</div>
	);
};

export default CommentSection;