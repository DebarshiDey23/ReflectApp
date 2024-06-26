const express = require('express');
const Prompt = require('../models/Prompt');
const notificationService = require('../notificationService');
const User = require('../models/userModel'); // Ensure you have a User model

const router = express.Router();

// Create a new prompt
router.post('/', async (req, res) => {
  const { content } = req.body;
  
  try {
    const prompt = new Prompt({ content });
    await prompt.save();

    // Fetch all users to notify
    const users = await User.find({});
    const userIds = users.map(user => user._id.toString());

    // Send notification to all users
    notificationService.sendNotification(userIds, `New prompt: ${content}`);

    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find({});
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
