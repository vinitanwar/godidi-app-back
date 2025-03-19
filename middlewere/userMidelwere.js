import User from "../model/userModel.js";
import JWT from "jsonwebtoken"



const decoded =(token)=>{ return JWT.verify(token, process.env.SECRET_KEY);}



export const userMidelwere=async(req,res,next)=>{
    try {
        const token= req.cookies.godiduser;
   
const {id}=decoded(token)

if(!id){
    return res.status(301).json({message:"userNotfound",success:false})

}

const user = await User.findById({_id:id});
if(!user){
    return res.status(301).json({message:"userNotfound",success:false})}

req.senderType="user";

    next()


    } catch (error) {
        return res.status(301).json({message:error.message,success:false})
    }
}