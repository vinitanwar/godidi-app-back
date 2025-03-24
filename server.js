import express from "express";
import dotenv from "dotenv";
import user from "./route/userRouter.js";
import admin from "./route/adminRouter.js"
import message from "./route/chatRouter.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import http from "http"
import { Server } from "socket.io";

dotenv.config()
const app=express()
const PORT=8000

const server= http.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://145.223.22.236:3005", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 

}))


app.use("/api",user)
app.use("/api/admin",admin)
app.use("/api/message",message)






app.get("/",async(req,res)=>{
    res.send("okkkkk")
})




    
    


const io = new Server(server, {
    cors: {
        origin: "http://145.223.22.236:3005",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
   
    socket.on("joinroom", (item) => {
        socket.join(item);
     
        socket.to(item).emit("message", { user: "System", text: `User ${socket.id} joined the item` });
       
    });
    socket.on("sendMessage", ({ room,senderType,message}) => {
       
    
        io.to(room).emit("message", {  senderType, message });
    
   
  });





    socket.on("disconnect", () => {
     
    });
});

mongoose.connect(process.env.DB_URL,{dbName:"godidi_v2"}).then(()=>{
    server.listen(PORT,()=>{
        console.log(`app running on http://localhost:${PORT}`)
    })
})
