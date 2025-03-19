import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";


export const sendMessage=async(req,res)=>{
    try {
        const {message,messageid}=req.body;
        const senderType = req.senderType;
if(!message  || !senderType ||!messageid){
    return res.status(200).json({success:false,message:"enteralldata"})
}
const creatmessage= await Chat.create({message,senderType,messageid})

return res.status(201).json({success:true,message:"message send",creatmessage})



    } catch (error) {
        res.status(200).json({success:false,message:error.message})
    }
}

export const userMessage=async(req,res)=>{
    try {

        const {messageid} =req.params;

        const allMesasge= await Chat.find({messageid});

        return res.status(200).json({success:true,allMesasge})
        
    } catch (error) {
        return res.status(300).json({success:false,message:"asdwedwe"})
    }
}

export const getmessabyadmin= async(req,res)=>{
    try {
        const {userid}=req.params;
    if(!userid){
        return res.status(200).json({success:false,message:"enter valid data"})
    }

const message= await Message.findOne({userId:userid})
if(!message){
    return res.status(200).json({success:false,message:"enter valid data"})
}
return res.status(200).json({success:true,messageId:message._id})
        
    } catch (error) {
        return res.status(400).json({success:false,messageId:"sdfiweorfiweoweif"})
    }
    





}