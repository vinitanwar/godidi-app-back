import mongoose from "mongoose";



   const messageSchema=new mongoose.Schema({
    adminId:{
type:mongoose.Schema.Types.ObjectId,
ref:"admin",
require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    }
   },{timestamps:true})


 const Message= mongoose.model("message",messageSchema)  

 export default Message;