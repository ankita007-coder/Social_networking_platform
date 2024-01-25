import multer from "multer";
import path from "path";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";



const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/photos/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + 'image-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  
  const uploadImage = multer({
    storage: imageStorage, // Fixed typo: 'imageStorage' instead of 'imageStorage'
    limits: { fileSize: 10000000000 },
  }).single('photo');
  
  export const uploadPhoto = async (req, res) => {
    try {
      const { userId } = req.user;
      uploadImage(req, res, async (imageErr) => {
        if (imageErr) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Image upload failed' });
        }
  
        const photoUrl = req.file ? req.file.path : '';
        const user = await User.findById(userId);
  
        const newPhoto = {
          photoUrl,
          caption: req.body.caption,
        };
  
        user.photos.push(newPhoto);
  
        await user.save();
  
        res.status(StatusCodes.OK).json({
          msg: 'Image uploaded',
        });
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
  
export const displayPhoto= async(req,res)=>{

    try {
        const {userId} = req.user;
        const user =await User.findById(userId);
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({msg:"User not found"})
        }
        else{
            const photos = user.photos;
            console.log(photos)
            return res.status(StatusCodes.OK).json({photos})
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Internal Server Error"});        
    }

}