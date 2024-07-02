const express = require('express');
const { blockUser, unblockUser } = require('../controllers/blockController');

const router = express.Router();

router.post('/block', blockUser);
router.post('/unblock', unblockUser);

module.exports = router;
