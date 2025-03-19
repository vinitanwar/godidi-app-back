import { creattoken, verifyPassword } from "../helper/jwtHelper.js";
import Admin from "../model/adminModel.js";
import Message from "../model/messageModel.js";
import JWT from "jsonwebtoken";
import User from "../model/userModel.js";
const decoded =(token)=>{ return JWT.verify(token, process.env.SECRET_KEY);}

 export  const addUser=async(req,res)=>{
try {
 const {name,number,email,gender,location,address,service} =req.body;

 if(!name || !number || !gender || !location || !address || !service || !email){
return res.status(301).json({message:"enter all feld",success:false})
 }


 const user=  await User.create({name,number,gender,location,address,service,email});
const admin =await Admin.findOne();

const message= await  Message.create({adminId:admin._id,userId:user._id})
   

 return res.cookie("godiduser",creattoken(user._id), {
    path: "/",
    httpOnly: true, 
    secure: true,
    sameSite: "None", 
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
}).status(201).json({success:true,message:"userAdd ",user,messageid:message._id})



    
} catch (error) {
    return res.status(500).json({message:error.message,success:false})

}
}




export const loginadmin=async(req,res)=>{
    try {
         const {number, password} =req.body;
         if(!number || !password){
            return res.status(301).json({message:"enter all feld",success:false})   }
            const admin = await Admin.findOne({number});
  const verify = await verifyPassword(password,admin.password)
if(!verify){
    return res.status(301).json({message:"enter valid Data",success:false}) 
  }



 
  return res.cookie("godiditokenadmin",creattoken(admin._id), {
    path: "/",
    httpOnly: true, 
    secure: true, 
    sameSite: "None", 
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
}).status(200).json({success:true,message:"login",admin})  
      

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})  

    }
}







export const getuser=async(req,res)=>{
    try {
        const token= req.cookies.godiduser;
const {id}=decoded(token)

if(!id){
    return res.status(301).json({message:"userNotfound",success:false})

}

const user = await User.findById({_id:id});
if(!user){
    return res.status(301).json({message:"userNotfound",success:false})}
const message= await Message.findOne({userId:user._id});
if(!message){
    return res.status(301).json({message:"userNotfound",success:false})}


    return res.status(200).json({success:true,message})


    } catch (error) {
        return res.status(301).json({message:error.message,success:false})
    }
}
 



