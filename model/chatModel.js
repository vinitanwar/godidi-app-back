import mongoose, { Schema } from "mongoose";


const chatSchema= new mongoose.Schema({
    message:{
        type:String,
        trim:true,
        required:true
    },
    senderType: {
        type: String,
        enum: ["user", "admin"],
        required: true,
      },
    messageid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        required:true
    }
},{timestamps:true})

const Chat = mongoose.model("chat",chatSchema);
export default Chat;