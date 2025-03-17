import mongoose from "mongoose";

const userMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  image: { type: String }, // Path to the uploaded image
  createdAt: { type: Date, default: Date.now },
});



const UserMessage= mongoose.model("UserMessage",userMessageSchema)
export default UserMessage;