
import Admin from "../model/adminModel.js";
import JWT from "jsonwebtoken";
import User from "../model/userModel.js";
import Message from "../model/messageModel.js";
const decoded =(token)=>{ return JWT.verify(token, process.env.SECRET_KEY);}

export const adminMidlewere=async(req,res,next)=>{
    try {
         const token = req.cookies.godiditokenadmin;
                if (!token) {
                    return res.status(201).json({
                        success: false, message: "No token provided" 
                    });
                }
        
              
const {id}=decoded(token)




      const admin= await Admin.findOne({_id:id});

      if(!admin){
        return res.status(200).json({
            success:false,message:"not token" })
        }

        req.senderType="admin"

            next()


    } catch (error) {
        return res.status(200).json({
            success:false,message:error.message }) 
    }
}




export const verifyAdmin=async(req,res)=>{
    try {
         const token = req.cookies.godiditokenadmin;
                if (!token) {
                    return res.status(200).json({
                        success: false, message: "No token provided" 
                    });
                }
        
              
const {id}=decoded(token)




      const admin= await Admin.findOne({_id:id});

      if(!admin){
        return res.status(200).json({
            success:false,message:"not token" })
        }

        return res.status(200).json({
            success:true,message:"userAded" })   


    } catch (error) {
        return res.status(200).json({
            success:false,message:error.message }) 
    }
}


export const verifyUser=async(req,res)=>{
    try {
         const token = req.cookies.godiduser;
                if (!token) {
                    return res.status(200).json({
                        success: false, message: "No token provided" 
                    });
                }
        
              
const {id}=decoded(token)




      const admin= await User.findOne({_id:id});
        const mssage= await Message.findOne({userId:admin._id})
      if(!admin || !mssage){
        return res.status(200).json({
            success:false,message:"not token" })
        }

        return res.status(200).json({
            success:true,message:"userAded",mssage })   


    } catch (error) {
        return res.status(200).json({
            success:false,message:error.message}) 
    }
}