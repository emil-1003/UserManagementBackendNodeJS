const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET all users
router.get('/', authMiddleware.adminAuth, userController.getAllUsers);

// GET specific user by ID
router.get('/:id', authMiddleware.accountAuth, userController.getUserById);

// POST create a new user
router.post('/', userController.createUser);

// PUT update a user by ID
router.put('/:id', authMiddleware.accountAuth, userController.updateUser);

// DELETE delete a user by ID
router.delete('/:id', authMiddleware.accountAuth, userController.deleteUser);

module.exports = router;
