import QNA from "../model/qnaModel.js";
import Service from "../model/serviceModel.js";
import User from "../model/userModel.js";

 
export const addService=async(req,res)=>{
    try {
        const {service}=req.body;

const allreadyService= await Service.findOne({service})
if(allreadyService){
    return res.status(200).json({success:false,message:"service allReady exist"})
}
await Service.create({service});
return res.status(200).json({success:true,message:"service add successfully"})


    } catch (error) {
        return res.status(500).json({success:false,message:error.message})

    }
}


export const getAllservice=async(req,res)=>{
    try {
        const allservices= await Service.find();
        if(!allservices || !allservices.length){
            return res.status(200).json({success:false,message:"service Not found"})

        }
        return res.status(200).json({success:true,service:allservices})


    } catch (error) {
        return res.status(500).json({success:false,message:error.message})

    }
}  

export const delteService=async(req,res)=>{

        const {id}=req.params;
      await Service.findByIdAndDelete({_id:id})
   return    res.status(200).json({success:true} )
    
}

export const getAlluser=async(req,res)=>{
try {
    const alluser= await User.find();
    if(!alluser){
        return res.status(200).json({success:false,message:"user Not found"})

    }

    
    return res.status(200).json({success:true,user:alluser})
} catch (error) {
    return res.status(200).json({success:false,message:error.message})

}
}


export const AddQna=async(req,res)=>{
    try {
        const { service, question, sequence, options } = req.body;
// Check if all fields are provided
if (!service || !question || !sequence || !options) {
    return res.status(200).json({ success: false, message: "All fields are required" });
}

// Verify if the service exists
const verifyservice = await Service.findOne({ service });

if (!verifyservice) {
    return res.status(200).json({ success: false, message: "Service is not added" });
}

// Check if the sequence already exists for the given service
const alreadySequence = await QNA.findOne({ service, sequence });

if (alreadySequence) {
    return res.status(200).json({ success: false, message: "This sequence already exists" });
}

// Create a new QNA entry
const createQNA = await QNA.create({ service, question, sequence, options });

return res.status(201).json({ success: true, message: "Service QNA added", data: createQNA });



   






        
    } catch (error) {
        return res.status(200).json({success:false,message:error.message})

    }
}


export const allservicesQna=async(req,res)=>{
    try {
         const {service}=req.params;

         const findqna= await QNA.find({service})
         if(!findqna){
            return res.status(200).json({ success: false, message: "qna not found" });

         }

         return res.status(200).json({ success: true, qna:findqna });



    } catch (error) {
        return res.status(200).json({ success: false, message:error.message });

    }
}

export const deleteServiceqna=async(req,res)=>{
try {
    const {id}=req.params;

     await QNA.findByIdAndDelete({_id:id})
    return res.status(200).json({ success: true, message:"  qna deleted" });
} catch (error) {
    
}

}




export const editQna=async(req,res)=>{
    try {
        const { service, question, sequence, options } = req.body;
        const {id}=req.params;
// Check if all fields are provided
if (!service || !question || !sequence || !options || !id) {
    return res.status(200).json({ success: false, message: "All fields are required" });
}

// Verify if the service exists
const verifyservice = await Service.findOne({ service });

if (!verifyservice) {
    return res.status(200).json({ success: false, message: "Service is not added" });
}

// Check if the sequence already exists for the given service
const alreadySequence = await QNA.findOneAndUpdate({_id:id},{service, question, sequence, options}, { new: true })

if (!alreadySequence) {
    return res.status(404).json({ success: false, message: "QNA not found" });
}

return res.status(201).json({ success: true, message: "Service QNA added", data: alreadySequence });



   






        
    } catch (error) {
        return res.status(200).json({success:false,message:error.message})

    }
}

