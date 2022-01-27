const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require('../middleware/auth');


router.get('/friendrequests',auth, friendController.getFriendRequests);
router.get('/makefriends', auth, friendController.getMakeFriends);
router.get('/friends', auth, friendController.getFriends);
router.post('/makefriends/:id',auth, friendController.sendRequest);
router.post('/accept-request/:id',auth, friendController.acceptRequest);
router.post('/decline-request/:id',auth, friendController.declineRequest);
router.post('/unfriend/:id',auth, friendController.unFriend);

module.exports = router;

