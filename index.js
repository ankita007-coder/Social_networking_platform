import 'http-status-codes';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import groupRouter from './routers/groupRouter.js';
import cors from "cors";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routers/chatRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/chat', chatRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  //wcwjehk
  socket.on('newMessage',(data)=>{
    socket.broadcast.emit('receive-data',data)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT;

try {
  await mongoose.connect(process.env.MONGO_URL);

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Error while connecting:", error);
}
