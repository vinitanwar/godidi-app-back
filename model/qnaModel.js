import mongoose from "mongoose"

const qnaSchemsa= new  mongoose.Schema({
service:{
    type:String,
    trim:true,
    required:true
},
question:{
    type:String,
    trim:true,
    required:true
},

sequence:{
    type:Number,
   required:true},

   options:[
    {
        label: { type: String, required: true },
        value: { type: String, required: true }
    },

   ]


},{timestamps:true})



const QNA= mongoose.model("qna",qnaSchemsa)

export default QNA;