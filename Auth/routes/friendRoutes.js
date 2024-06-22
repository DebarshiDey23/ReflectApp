const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const { addFriend, getFriends, removeFriend } = require('../controllers/friendController');

const router = express.Router();

router.post('/add', authenticateToken, addFriend);
router.get('/', authenticateToken, getFriends);
router.delete('/remove', authenticateToken, removeFriend);

module.exports = router;
