import { StatusCodes } from 'http-status-codes';
import Message from '../models/messageModel.js';

export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;

    // Retrieve chat messages between the current user and the friend
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    }).sort('createdAt');

    res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    const { userId } = req.user;
    const { friendId } = req.params;
    const { content } = req.body;

    // Create a new message
    const newMessage = new Message({
      sender: userId,
      receiver: friendId,
      content,
    });

    // Save the message
    await newMessage.save();

    res.status(StatusCodes.CREATED).json({ msg: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
  }
};
