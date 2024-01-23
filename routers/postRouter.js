import { Router } from "express";
import {
         createPost, 
         deletePost, 
         showAllPosts 
    } from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import { addLike } from "../controllers/likeController.js";
import { addComment } from "../controllers/commentController.js";


const router = Router();

router.get('/',showAllPosts);
router.post('/',createPost);
router.post('/:id',deletePost);
router.post('/:postId/comment',authMiddleware,addComment);
router.post('/:postId/likes',authMiddleware,addLike);


export default router;