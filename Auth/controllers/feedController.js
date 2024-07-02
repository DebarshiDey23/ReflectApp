const User = require('../models/User');
const Response = require('../models/response');

const getFeed = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get all posts from friends that are not blocked
    const friendIds = user.friends.filter(friend => !user.blockedUsers.includes(friend._id)).map(friend => friend._id);
    
    const responses = await Response.find({ user: { $in: friendIds }, isPublic: true })
      .populate('user')
      .sort({ createdAt: -1 });

    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFeed,
};
