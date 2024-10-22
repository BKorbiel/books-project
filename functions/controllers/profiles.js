import User from "../models/user.js";
import { ObjectId } from 'mongodb';

export const getProfile = async (req, res) => {
	const {id} = req.params;
	try {
		const _id = ObjectId(id);
		const {name, picture, createdAt, booksToRead, booksRead, favoriteBooks} = await User.findById(_id);
		res.status(200).json({name, picture, createdAt, booksToRead, booksRead, favoriteBooks});
	} catch(error) {
		res.status(404).json({ message: error.message });
	}

}

export const addToList = async (req, res) => {
	const {id} = req.params;
	const {bookId, title, thumbnail, list} = req.body;

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const user = await User.findById(id);
	let index;

	switch (list) {
		case "booksToRead":
			index = user.booksToRead.findIndex((book) => book.bookId==bookId);
			if (index!=-1){
				return res.json({message: 'Book is alread in the list'});
			}
			user.booksToRead.push({bookId, title, thumbnail});
			break;
		case "booksRead":
			index = user.booksRead.findIndex((book) => book.bookId==bookId);
			if (index!=-1){
				return res.json({message: 'Book is alread in the list'});
			}
			user.booksRead.push({bookId, title, thumbnail});
			break;
		case "favoriteBooks":
			index = user.favoriteBooks.findIndex((book) => book.bookId==bookId);
			if (index!=-1){
				return res.json({message: 'Book is alread in the list'});
			}
			user.favoriteBooks.push({bookId, title, thumbnail});
			break;
		default:
			return res.json({message: 'Wrong list'});
	}
	await User.findByIdAndUpdate(id, user, {new: true});
	res.json({message: 'Book added to list successfully'});
}

export const deleteBookFromList = async (req, res) => {
	const {id, listName, bookId} = req.params;

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const user = await User.findById(id);

	let index;

	switch (listName) {
		case "Books to read":

			index = user.booksToRead.findIndex((book) => book.bookId==bookId);
			if (index==-1){
				return res.json({message: 'Book is not in the list'});
			}
			user.booksToRead.splice(index, 1);
			break;
		case "Books read":
			index = user.booksRead.findIndex((book) => book.bookId==bookId);
			if (index==-1){
				return res.json({message: 'Book is not in the list'});
			}
			user.booksRead.splice(index, 1);
			break;
		case "Favorite books":
			index = user.favoriteBooks.findIndex((book) => book.bookId==bookId);
			if (index==-1){
				return res.json({message: 'Book is not in the list'});
			}
			user.favoriteBooks.splice(index, 1);
			break;
		default:
			return res.json({message: 'Wrong list'});
	}

	await User.findByIdAndUpdate(id, user);
	res.json({message: 'Book deleted successfully'});

}

export const editName = async (req, res) => {
	const {id} = req.params;
	const {newName} = req.body;

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const user = await User.findById(id);
	user.name=newName;

	const updatedProfile = await User.findByIdAndUpdate(id, user, {new:true});
	res.json(updatedProfile);
}

export const editPicture = async (req, res) => {
	const {id} = req.params;
	const {newPicture} = req.body;

	if(!req.userId) return res.json({message: 'Unauthenticated'});

	const user = await User.findById(id);
	user.picture=newPicture;

	const updatedProfile = await User.findByIdAndUpdate(id, user, {new:true});
	res.json(updatedProfile);
}