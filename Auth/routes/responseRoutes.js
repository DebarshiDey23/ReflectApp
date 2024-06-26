const express = require('express');
const Response = require('../models/response');
const User = require('../models/userModel'); // Ensure you have a User model
const notificationService = require('../notificationService');

const router = express.Router();

// Post a response to a prompt
router.post('/', async (req, res) => {
  const { promptId, content, isPublic } = req.body;
  const userId = req.user.id;
  
  try {
    const response = new Response({ userId, promptId, content, isPublic });
    await response.save();

    // Notify user's friends about the new response
    const user = await User.findById(userId).populate('friends');
    const friendIds = user.friends.map(friend => friend._id.toString());

    // Send notification to user's friends
    notificationService.sendNotification(friendIds, `Your friend ${user.username} has posted a new response!`);

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch responses for a specific prompt
router.get('/prompt/:promptId', async (req, res) => {
  const { promptId } = req.params;

  try {
    const responses = await Response.find({ promptId }).populate('userId promptId');
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch responses for a specific user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const responses = await Response.find({ userId }).populate('userId promptId');
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
