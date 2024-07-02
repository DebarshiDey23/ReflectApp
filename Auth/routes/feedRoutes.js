const express = require('express');
const mongoose = require('mongoose');
const Response = require('../models/response');
const Comment = require('../models/comment');
const User = require('../models/userModel');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Middleware to ensure user is authenticated
router.use(authenticateToken);

// Get feed for a user
router.get('/feed', async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendIds = user.friends
      .filter(friend => !user.blockedUsers.includes(friend._id)) // Exclude blocked users
      .map(friend => friend._id);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Check if the user has posted a response today
    const userHasPostedToday = await Response.exists({ userId, createdAt: { $gte: startOfDay } });

    if (!userHasPostedToday) {
      return res.status(403).json({ error: 'Feed is locked until you post a response for today' });
    }

    const responses = await Response.find({
      userId: { $in: friendIds },
      createdAt: { $gte: startOfDay },
      isPublic: true
    }).populate('userId promptId');

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
