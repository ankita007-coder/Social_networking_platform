import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const displayNonFriends = async(req,res)=>{
  try {
    const { userId } = req.user;

    // Find the current user
    const currentUser = await User.findById(userId).select('friends');

    // Find all users who are not friends with the current user
    const nonFriends = await User.find({
      _id: { $ne: userId },
      'friends.accepted': { $ne: userId },
    }).select('fullName profilePic');

    res.status(StatusCodes.OK).json(nonFriends);
  } catch (error) {
    console.error('Error fetching non-friends:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
  }
}

export const addFriends = async (req, res) => {
    try {
      const { friendId } = req.body;
      const { userId } = req.user;
  
      // Find the current user and the friend user
      const currentUser = await User.findById(userId).select('friends');
      const friendUser = await User.findById(friendId);
  
      if (!currentUser || !friendUser) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'User or friend not found' });
      }
  
      // Check if the friend is already in the accepted list
      if (!currentUser.friends.accepted.includes(friendId)) {
        // Add the friend to the accepted list for the current user
        currentUser.friends.accepted.push(friendId);
  
        // Add the current user to the accepted list for the friend
        friendUser.friends.accepted.push(userId);
  
        // Save changes for both users
        await currentUser.save();
        await friendUser.save();
  
        return res.status(StatusCodes.OK).json({ msg: 'Friend added successfully' });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Already friends' });
      }
    } catch (error) {
      console.error('Error adding friend:', error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
    }
  };
  

  export const viewProfile = async(req,res)=>{

    try {

      const friendId = req.params.friendId;
      const user = await User.findById(friendId).select('-password');
      if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({msg:"User not found"});
      }
      else{
        return res.status(StatusCodes.OK).json({user});
      }
      
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Internal Server error"})
    }
  }

export const displayFriends = async(req,res)=>{
  try {
        const {userId} = req.user;
        const user  = await User.findById(userId).populate('friends.accepted');
        if(!user){
          return res.status(StatusCodes.NOT_FOUND).json({msg:"user not found"});
        }
        const friends = user.friends.accepted;
        return res.status(StatusCodes.OK).json({friends})
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
  }
}

export const removeFriend = async(req,res)=>{
  try {

    const { userId } = req.user;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    user.friends.accepted = user.friends.accepted.filter(
      (friend) => friend.toString() !== friendId
    );
    await user.save();

    const friendUser = await User.findById(friendId);
    friendUser.friends.accepted = friendUser.friends.accepted.filter(
      (friend) => friend.toString() !== userId
    );
    await friendUser.save();

    res.status(200).json({ msg: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}

  