import express from 'express';

import { getPosts, createPosts, updatePost, deletePost, likePost } from '../controllers/postController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;