const User = require('../models/userModel');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.username = username;
    user.username_last_changed = Date.now();
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateName = async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.first_name = first_name;
    user.last_name = last_name;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfilePicture = async (req, res) => {
  const { profile_picture } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.profile_picture = profile_picture;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  updateUsername,
  updateName,
  updateProfilePicture
};
