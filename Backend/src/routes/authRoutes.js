const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

router.post('/invite', protect, restrictTo('Admin'), authController.generateInvite);
router.get('/google', authController.initiateGoogleAuth);
router.get('/google/callback', authController.handleGoogleCallback);

module.exports = router;
