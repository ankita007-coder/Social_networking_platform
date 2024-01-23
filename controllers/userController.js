import User from "../models/userModel.js"
import { StatusCodes } from "http-status-codes"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

export const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res
            .status(StatusCodes.OK)
            .json(users)
    } catch (error) {
        console.log(error);
        res
            .status(StatusCodes.NOT_FOUND)
            .json({error})
    }
}

export const register = async(req,res)=>{
    try {
            const {userName,
                    email,
                    password,
                    fullName,
                    city,
                    state,
                    gender,
                    profession,
                    bio,
                    photos
                } = req.body;
            const hashPassword = await bcrypt.hash(password,10);
            await User.create({
                userName,
                email,
                password:hashPassword,
                fullName,
                city,
                state,
                gender,
                profession,
                bio,
                profilePic: 'profilePic.png'
            })
        res.status(StatusCodes.CREATED).json({
            msg: "User Created"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(StatusCodes.NOT_FOUND).json({msg: "User not found please register"})
            return
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            res.status(StatusCodes.UNAUTHORIZED).json({msg: "Wrong password"})
            return
        }  
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY);
           // console.log("signin", token)
        res.status(StatusCodes.OK).json({token,user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error});
    }
}

export const getProfile = async (req, res) => {
    //console.log(req.user)
    try {
     
        const userId = req.user.userId;
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User not found' });
      }
  
      //console.log('Profile retrieved:', user);
      res.status(StatusCodes.OK).json({user});
    } catch (error) {
     // console.error('Error fetching profile:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
    }
  };
  

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profilePic/');
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    });

const uploadImage = multer({
    storage: imageStorage, // Fixed typo: 'imageStorage' instead of 'imageStorage'
    limits: { fileSize: 10000000000 },
    }).single('profilePicture');
      
    export const profilePicUpdate = (req, res) => {
        uploadImage(req, res, async (err) => {
          if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
          }
      
          try {
            console.log(req.user);
            const userId = req.user.userId;
            const imageUrl = req.file ? req.file.path : '';
            await User.findByIdAndUpdate(userId, { $set: { profilePic: imageUrl } });
            res.status(StatusCodes.OK).json({ msg: 'Profile pic updated', imageUrl: imageUrl });
          } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
          }
        });
      };
      
