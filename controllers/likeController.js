import { StatusCodes } from "http-status-codes";
import Post from "../models/postModel.js";

export const addLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.some((like) => like.author.equals(userId));

    // Create a new array instead of modifying the existing one
    let updatedLikes;

    if (alreadyLiked) {
      updatedLikes = post.likes.filter((like) => !like.author.equals(userId));
    } else {
      updatedLikes = [...post.likes, { author: userId }];
    }

    // Update the post with the new likes array
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { likes: updatedLikes },
      { new: true } // This ensures that you get the updated post in the response
    ).populate('likes.author', 'fullName profilePic'); // Adjust this based on your User model fields

    res.status(StatusCodes.OK).json({ post: updatePost });
  } catch (error) {
    console.error("Error in addLike:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};
