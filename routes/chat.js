const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');


router.get('/chat',auth, chatController.getIndex);


module.exports = router;

