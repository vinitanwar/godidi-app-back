import mongoose from "mongoose";

 const serviceSchema= new mongoose.Schema({
    service:{
            type: String,
            trim: true,
            unique: true,
            required: [true, "Service name is required"], 
    }
 },{timestamps:true})

 const Service= mongoose.model("services",serviceSchema);
export default Service;
