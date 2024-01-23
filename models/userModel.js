import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    fullName: String,
    city: String,
    state: String,
    gender: {
        type: String,
        enum: ['Female','Male']
    },
    profession: String,
    profilePic:String,
    photos:[{
        type:String
    }],
    friends: {
        accepted: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        }],
        pending: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
        }]
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User',userSchema);