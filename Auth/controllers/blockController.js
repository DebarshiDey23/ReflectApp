const User = require('../models/userModel');

const blockUser = async (req, res) => {
  const { userId, blockUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const blockUser = await User.findById(blockUserId);

    if (!user || !blockUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove from friends list
    user.friends = user.friends.filter(friendId => !friendId.equals(blockUserId));
    // Add to blocked users list
    if (!user.blockedUsers.includes(blockUserId)) {
      user.blockedUsers.push(blockUserId);
    }

    await user.save();

    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unblockUser = async (req, res) => {
  const { userId, unblockUserId } = req.body;

  try {
    const user = await User.findById(userId);
    const unblockUser = await User.findById(unblockUserId);

    if (!user || !unblockUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove from blocked users list
    user.blockedUsers = user.blockedUsers.filter(userId => !userId.equals(unblockUserId));

    await user.save();

    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  blockUser,
  unblockUser,
};
