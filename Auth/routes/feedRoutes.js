// routes/feedRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Response = require('../models/Response');
const Comment = require('../models/Comment');
const User = require('../models/User');

const router = express.Router();

// Get feed for a user
router.get('/feed', async (req, res) => {
  const userId = req.user.id;
  
  try {
    const user = await User.findById(userId).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);

    const responses = await Response.find({ userId: { $in: friendIds }, createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }, isPublic: true }).populate('userId promptId');

    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a response to a prompt
router.post('/response', async (req, res) => {
  const { promptId, content, isPublic } = req.body;
  const userId = req.user.id;
  
  try {
    const response = new Response({ userId, promptId, content, isPublic });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post a comment on a response
router.post('/comment', async (req, res) => {
  const { responseId, content } = req.body;
  const userId = req.user.id;
  
  try {
    const comment = new Comment({ responseId, userId, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
