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
  