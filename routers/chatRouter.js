import express from 'express';
import { getChatMessages, sendChatMessage } from '../controllers/chatController.js';
import authMiddleware from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.use(authMiddleware);

// Route to get chat messages
router.get('/:friendId', getChatMessages);

// Route to send a new message
router.post('/:friendId', sendChatMessage);

export default router;
