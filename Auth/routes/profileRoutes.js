const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getProfile, updateUsername, updateName, updateProfilePicture } = require('../controllers/profileController');

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/username', authenticateToken, updateUsername);
router.put('/name', authenticateToken, updateName);
router.put('/picture', authenticateToken, updateProfilePicture);

module.exports = router;
