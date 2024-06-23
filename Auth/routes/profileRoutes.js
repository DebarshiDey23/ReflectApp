const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { getProfile, updateName, updateProfilePicture, updateFirstName, updateLastName, updateUsername} = require('../controllers/profileController');
const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/username', authenticateToken, updateUsername);
router.put('/name', authenticateToken, updateName);
router.put('/picture', authenticateToken, updateProfilePicture);
router.put('/profile/firstname', authenticateToken, updateFirstName);
router.put('/profile/lastname', authenticateToken, updateLastName);

module.exports = router;
