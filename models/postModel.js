import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    imageUrl: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    likes: [likeSchema],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Post',postSchema);