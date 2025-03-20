import mongoose from "mongoose";

const userqnaSchema = new mongoose.Schema({
    messagid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    question:{
        type:String,
        required:true,
        trim:true
    },
    answer:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});


const UserQna= mongoose.model("userqna",userqnaSchema)

export default UserQna;