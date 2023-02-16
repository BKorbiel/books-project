import axios from 'axios';
import CommentSection from '../models/comments.js';
import { ObjectId } from 'mongodb';
import User from "../models/user.js";
import dotenv from 'dotenv';


export const getBook = async (req, res) => {
	const {id} = req.params;
	const _id = ObjectId(id);
	const comments = (await CommentSection.findById(_id))?.comments;
	axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
	.then(response => {
		const book=response.data;
		res.status(200).json({book, comments});
	})
	.catch(error=>{
		res.status(404).json({ message: error });
	})

};

export const getBooksBySearch = async (req, res) => {
	const maxResult = "15";
	const {searchQuery, subject, author, page} = req.query;
	let search = searchQuery?.length ? searchQuery : "";
	search += subject?.length ? "+subject:"+subject : "";
	search += author?.length ? "+inauthor:"+author : "";
	const startIndex = (page-1)*Number(maxResult);
	axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${maxResult}&langRestrict=en`)
	.then(response => {
		const books=response.data.items;
		const numberOfPages=Math.ceil(response.data.totalItems/Number(maxResult));
		res.status(200).json({numberOfPages: numberOfPages, data: books});
	})
	.catch(error=>{
		res.status(404).json({ message: error });
	})

};

export const commentBook = async (req, res) => {
	const {book_id, message, creator_name, creator_picture, creator_id, rating} = req.body;
	const commentSection = await CommentSection.findById(book_id);
	if (commentSection) {
		commentSection.comments.push({rating: Number(rating), message: message, creator_name: creator_name, creator_picture: creator_picture, creator_id: creator_id, createdAt: new Date().toISOString()});
		const updatedCommentSection = await CommentSection.findByIdAndUpdate(book_id, commentSection, {new: true});
		res.json(updatedCommentSection.comments);
	}
	else {
		const newCommentSection = new CommentSection({_id: book_id, comments: [{rating: Number(rating), message: message, creator_name: creator_name, creator_picture: creator_picture, creator_id: creator_id, createdAt: new Date().toISOString()}]});
		try {
			await newCommentSection.save();
			res.status(201).json(newCommentSection.comments);
		} catch (error) {
			res.status(409).json({message: error.message})
		}
	}

}

export const likeComment = async (req, res) => {
	const {book_id, comment_id} = req.params;
	const {user_id} = req.body;
	const _id = ObjectId(book_id);

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const commentSection = await CommentSection.findById(_id);

	commentSection.comments.forEach((comment) => {
		if (comment._id==comment_id){
			const index = comment.likeCount.findIndex((id) => id==user_id);
			if(index==-1) {
				comment.likeCount.push(user_id);
			} else {
				comment.likeCount=comment.likeCount.filter((id) => id!=user_id);
			}
		}
	});
	const updatedCommentSection = await CommentSection.findByIdAndUpdate(book_id, commentSection, {new: true});

	res.json(updatedCommentSection.comments);

}

export const deleteComment = async (req, res) => {
	const {book_id, comment_id} = req.params;

	const _id = ObjectId(book_id);

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const commentSection = await CommentSection.findById(_id);

	const ind = commentSection.comments.findIndex((comment) => comment._id.equals(comment_id));
	commentSection.comments.splice(ind, 1);

	await CommentSection.findByIdAndUpdate(book_id, commentSection);

	res.json({message: 'Comment deleted successfully'});
}

export const editComment = async (req, res) => {
	const {book_id, comment_id, message, rating} = req.body;

	const _id = ObjectId(book_id);

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const commentSection = await CommentSection.findById(_id);

	const ind = commentSection.comments.findIndex((comment) => comment._id.equals(comment_id));
	
	commentSection.comments[ind].message=message;

	commentSection.comments[ind].rating=rating;

	const updatedCommentSection = await CommentSection.findByIdAndUpdate(book_id, commentSection, {new: true});

	res.json(updatedCommentSection.comments);
}