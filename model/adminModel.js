import mongoose from "mongoose";

  const adminSchema= new mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  },{timestamps:true});


  const Admin = mongoose.model("admin",adminSchema)

  export default Admin;