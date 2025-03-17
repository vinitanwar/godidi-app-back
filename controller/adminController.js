import Service from "../model/serviceModel.js";

 
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
      res.status(200).json()
    
}


