import mongoose, { mongo } from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default mongoose.model('Groups',groupSchema)