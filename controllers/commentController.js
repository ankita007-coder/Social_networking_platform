// Import necessary modules
import { StatusCodes } from "http-status-codes";
import Post from "../models/postModel.js";

// Route handler to add a comment to a post
export const addComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;
  const { content } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Post not found' });
    }

    // Create a new comment object
    const newComment = {
      content,
      author: userId,
    };

    // Use Mongoose's push method to add the comment to the comments array
    post.comments.push(newComment);

    // Save the updated post with the new comment
    const updatedPost = await post.save();

    // Populate the comments array with author details
    const populatedPost = await Post.populate(updatedPost, {
      path: 'comments.author',
      select: 'fullName profilePic userName',
    });

    // Return success response with the updated post
    return res.status(StatusCodes.OK).json({
      msg: 'Comment added',
      post: populatedPost,
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    // Return internal server error response in case of an error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Internal Server Error',
    });
  }
};
