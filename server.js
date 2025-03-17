import express from "express";
import dotenv from "dotenv";
import user from "./route/userRouter.js";
import admin from "./route/adminRouter.js"
import mongoose from "mongoose";

import Question from "./model/Question.js";

import UserMessage from "./model/UserMessage.js";



import cors from "cors"; 


import cookieParser from "cookie-parser";

import multer from "multer";
import path from "path";

dotenv.config()
const app=express()
const PORT=8000



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 

}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error('Only images (jpeg, jpg, png) are allowed'));
    },
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Something went wrong!' });
  });



app.use("/api",user)
app.use("/api/admin",admin)



// app.use('/api/suggestions', );
// app.use('/api/user-messages', userMessageRoutes);


app.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.get('/api/questions/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new question
  app.post('/api/questions', async (req, res) => {
    try {
      const { text, response, suggestions } = req.body;
      if (!text || !response) {
        return res.status(400).json({ error: 'Text and response are required' });
      }
      const question = new Question({
        text,
        response,
        suggestions: Array.isArray(suggestions) ? suggestions : [], // Default to empty array if not provided
      });
      await question.save();
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a question
  app.put('/api/questions/:id', async (req, res) => {
    try {
      const { text, response, suggestions } = req.body;
      if (!text || !response) {
        return res.status(400).json({ error: 'Text and response are required' });
      }
      const question = await Question.findByIdAndUpdate(
        req.params.id,
        {
          text,
          response,
          suggestions: Array.isArray(suggestions) ? suggestions : [],
        },
        { new: true, runValidators: true }
      );
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a question
  app.delete('/api/questions/:id', async (req, res) => {
    try {
      const question = await Question.findByIdAndDelete(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  

  // Get all user messages
  app.get('/api/user-messages', async (req, res) => {
    try {
      const messages = await UserMessage.find();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single user message by ID
  app.get('/api/user-messages/:id', async (req, res) => {
    try {
      const message = await UserMessage.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a new user message with optional image
  app.post('/api/user-messages', upload.single('image'), async (req, res) => {

    console.log('req.file:', req.file);
  console.log('req.body:', req.body);
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
  
      const messageData = { text };
      if (req.file) {
        messageData.image = req.file.path;
      }
  
      const message = new UserMessage(messageData);
      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a user message (text only, image updates could be added separately if needed)
  app.put('/api/user-messages/:id', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      const message = await UserMessage.findByIdAndUpdate(
        req.params.id,
        { text },
        { new: true, runValidators: true }
      );
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a user message
  app.delete('/api/user-messages/:id', async (req, res) => {
    try {
      const message = await UserMessage.findByIdAndDelete(req.params.id);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      // Optionally delete the image file from the server here using fs.unlink
      res.status(200).json({ message: 'User message deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.get("/",async(req,res)=>{
    res.send("okkkkk")
})





mongoose.connect(process.env.DB_URL,{dbName:"godidi_v2"}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`app running on http://localhost:${PORT}`)
    })
})
