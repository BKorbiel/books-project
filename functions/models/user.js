import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String},
	picture: {type: String, default: null},
	createdAt: {type: Date, default: new Date()},
	id: {type: String},
	booksToRead: { 
		type: [{
			bookId: String,
			title: String,
			thumbnail: String,
		}], 
		default: []},
	booksRead: { 
		type: [{
			bookId: String,
			title: String,
			thumbnail: String,
		}], 
		default: []},
	favoriteBooks: { 
		type: [{
			bookId: String,
			title: String,
			thumbnail: String,
		}], 
		default: []},
})

export default mongoose.model("User", userSchema);