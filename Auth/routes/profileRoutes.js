const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getProfile, updateName, updateProfilePicture, updateFirstName, updateLastName, updateUsername, addMessagetoUser} = require('../controllers/profileController');
const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/username', authenticateToken, updateUsername);
router.put('/name', authenticateToken, updateName);
router.put('/picture', authenticateToken, updateProfilePicture);
router.put('/profile/firstname', authenticateToken, updateFirstName);
router.put('/profile/lastname', authenticateToken, updateLastName);
router.post('/addMessage', authenticateToken, async (req, res) => {
    const { content, sender } = req.body;
    const userId = req.user.id; // Assuming you have authentication middleware
  
    try {
      const user = await addMessageToUser(userId, content, sender);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
