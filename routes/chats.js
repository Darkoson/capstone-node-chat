const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chatsController');
const auth = require('../middleware/auth');


router.get('/chats',auth, chatsController.getIndex);


module.exports = router;

