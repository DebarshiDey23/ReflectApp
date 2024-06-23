const User = require('../models/userModel');


const addMessagetoUser = async (userID, messageContent, sender) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Couldn't find User")
    }

    const message = {
      content: messageContent,
      sender: sender,
    }

    user.messages.push(message)
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message());
  }

}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFirstName = async (req, res) => {
  const { firstName } = req.body;
  const userId = req.user.id; // Assuming you have authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { firstName });
    res.status(200).json({ message: 'First name updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLastName = async (req, res) => {
  const { lastName } = req.body;
  const userId = req.user.id; // Assuming you have authentication middleware

  try {
    await User.findByIdAndUpdate(userId, { lastName });
    res.status(200).json({ message: 'Last name updated successfully' });
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
  updateProfilePicture,
  updateFirstName,
  updateLastName,
  updateUsername,
  addMessagetoUser
};
