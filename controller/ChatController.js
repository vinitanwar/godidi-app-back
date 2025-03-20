import Chat from "../model/chatModel.js";
import Message from "../model/messageModel.js";
import UserQna from "../model/userqnaModel.js";


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
   
        const user = await Message.findOne({_id:messageid}).populate("userId")
      const allMesasge= await Chat.find({messageid});

        return res.status(200).json({success:true,allMesasge,user})
        
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




export const sendqna = async (req, res) => {
    try {
        const { messagid, question, answer } = req.body;

        if (!messagid || !question || !answer) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await UserQna.create({ messagid, question, answer });

        return res.status(201).json({ success: true, message: "Message sent successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const fetchallQna=async(req,res)=>{
    try {
         const {messagid} =req.params ;
         if(!messagid){
          return  res.status(200).json({ success: false, message: "need id" });
         }

          
         const allqna= await UserQna.find({messagid})
         return res.status(200).json({ success: true, allqna });


    } catch (error) {
        return  res.status(500).json({ success: false, message: error.message });

    }
}