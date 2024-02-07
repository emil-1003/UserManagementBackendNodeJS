const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST login
router.post('/login', authController.login);

// PUT new password
router.put('/new/password', authMiddleware.userAuth, authController.newPassword);

module.exports = router;
