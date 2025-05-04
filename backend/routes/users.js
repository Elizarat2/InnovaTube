const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/me', auth, userController.getMe);
router.patch('/update-me', auth, userController.updateMe);
router.patch('/update-password', auth, userController.updatePassword);