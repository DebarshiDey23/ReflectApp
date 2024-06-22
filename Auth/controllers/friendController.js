const User = require('../models/userModel');
const Friendship = require('../models/friendshipModel');

const addFriend = async (req, res) => {
  const { friendId } = req.body;

  try {
    const friendship = new Friendship({
      user_id: req.user.id,
      friend_id: friendId,
      status: 'pending'
    });
    await friendship.save();
    res.json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const friends = await Friendship.find({ user_id: req.user.id, status: 'accepted' })
      .populate('friend_id', 'username first_name last_name profile_picture');
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFriend = async (req, res) => {
  const { friendId } = req.body;

  try {
    const friendship = await Friendship.findOneAndDelete({ user_id: req.user.id, friend_id: friendId });
    res.json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFriend,
  getFriends,
  removeFriend
};
