import { getBook, getBooksBySearch, commentBook, likeComment, deleteComment, editComment } from '../controllers/books.js';
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();



router.get('/search', getBooksBySearch);
router.get('/:id', getBook);
router.post('/:id/commentBook', auth, commentBook);
router.patch('/:book_id/likeComment/:comment_id', auth, likeComment);
router.delete('/:book_id/deleteComment/:comment_id', auth, deleteComment);
router.patch('/:id/editComment', auth, editComment);

export default router;