import {getProfile, addToList, deleteBookFromList, editName, editPicture} from '../controllers/profiles.js';
import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getProfile);
router.patch('/:id/addtolist', auth, addToList);
router.patch('/:id/editName', auth, editName);
router.patch('/:id/editPicture', auth, editPicture);
router.delete('/:id/deleteBookFromList/:listName/:bookId', auth, deleteBookFromList);

export default router;