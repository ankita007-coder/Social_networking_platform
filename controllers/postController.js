import { StatusCodes } from "http-status-codes";
import Post from "../models/postModel.js";
import multer from "multer";
import path from 'path';

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'image-' + Date.now() + path.extname(file.originalname));
  }
});


const uploadImage = multer({
  storage: imageStorage, // Fixed typo: 'imageStorage' instead of 'imageStorage'
  limits: { fileSize: 10000000000 },
}).single('image');


export const createPost = async (req, res) => {
    try {
      uploadImage(req, res, async(imageErr) => {
        if (imageErr) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Image upload failed' });
        }
        const imageUrl = req.file ? req.file.path : '';
        
          const post = new Post({
            content: req.body.content||"No content",
            author: req.body.author,
            imageUrl,
           
          });
  
          await post.save(); // Save the post to the database
  
          res.status(StatusCodes.OK).json({
            msg: 'Post created successfully',
            post
          });
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
  

export const showAllPosts = async(req,res)=>{
    try {
       const posts = await Post
       .find({})
       .populate('author','userName fullName email profilePic')
       .populate('likes.author','userName fullName email profilePic')
       .populate('comments.author','userName fullName email profilePic')
       res.status(StatusCodes.OK).json({posts})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Internal Server Error"
        })
    }
}

export const deletePost = async(req,res)=>{
    
}

