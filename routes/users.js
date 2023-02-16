import {signin, signup, googlesignin} from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.post('/signin', signin);
router.post('/googlesignin', googlesignin);
router.post('/signup', signup);

export default router;