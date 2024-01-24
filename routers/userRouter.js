import { Router } from "express";
import { getAllUsers, getProfile, login, profilePicUpdate, register } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";
import { addFriends, displayNonFriends, viewProfile } from "../controllers/friendsController.js";


const router = Router();

router.get('/',getAllUsers);
router.post('/register',register);
router.post('/login',login);
router.get('/profile',authMiddleware,getProfile);
router.post('/profile/profile-picture',authMiddleware,profilePicUpdate);
router.post('/add-friend',authMiddleware,addFriends);
router.get('/non-friends',authMiddleware,displayNonFriends);
router.get('/view-profile/:friendId',viewProfile);
export default router;