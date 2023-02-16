import mongoose from 'mongoose';

const commentSectionSchema = mongoose.Schema({
	comments: [{
		rating: Number,
		message: String,
		creator_name: String,
		creator_picture: {type: String, default: null},
		creator_id: String,
		likeCount: {
			type: [String],
			default: []
		},
		createdAt: {
			type: Date,
			default: new Date()
		}
	}]
});

var CommentSection = mongoose.model('CommentSection', commentSectionSchema);

export default CommentSection;