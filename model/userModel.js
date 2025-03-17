import mongoose from "mongoose";
 
 const userSchema =  new   mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
      type:String,
      required:true,
     enum:["male","female","other"]
  },
  address:{
    type:String,
    required:true,
    trim:true
},
location:{
  type:String,
  required:true,
  trim:true
},
service:{
  type:String,
  required:true,
  trim:true
}
 },{timestamps:true})


 const User= mongoose.model("user",userSchema)

 export default User;