import express from "express";
const router = express.Router();



import express from 'express';

import UserMessage from '../models/UserMessage.js';


import multer from 'multer';
import path from 'path';


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

// Get all user messages
router.get('/', async (req, res) => {
  try {
    const messages = await UserMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user message by ID
router.get('/:id', async (req, res) => {
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
router.post('/', upload.single('image'), async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export default router;