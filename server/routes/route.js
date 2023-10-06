import express from 'express';

import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
import { deleteReplies, getReplies, newReply } from '../controller/reply-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();

//Routes for login,logout,and signup
router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

//Routes for creating my token 
router.post('/token', createNewToken);

//Route for creating updating and deleting the post
router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

//Route for getting post by id and getting all post 
router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

//Route for uploading my file and getting the file
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

//Route for doing comment getting comment and deleting the comment
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);


router.post('/reply/new', authenticateToken, newReply);
router.get('/replies/:id', authenticateToken, getReplies);
router.delete('/reply/delete/:id', authenticateToken, deleteReplies);

export default router;