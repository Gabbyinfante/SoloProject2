import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

//Get all blog
router.get('/', blogController.getAllBlogs);

//Get blog ID
router.get('/:id', blogController.getBlogByID);

//Create new blog post
router.post('/', blogController.createBlogPost);

//Like Blog Post
router.put('/like/:id', blogController.likeBlogPost);

//Create Comment
router.post('/:id/comment', blogController.addBlogComment);

//Like a Comment
router.put('/:id/comment/like/:commentIndex', blogController.likeBlogComment);

//Delete Post
router.delete('/:id', blogController.deleteBlogPost);
export default router;