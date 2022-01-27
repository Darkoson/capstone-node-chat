const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


router.post('/signup', authController.postSign);
router.post('/login', authController.postLogin);
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/logout', auth, authController.getLogout);



module.exports = router;
