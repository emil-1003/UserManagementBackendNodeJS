const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET all users
router.get('/', authMiddleware.adminAuth, userController.getAll);

// GET specific user by ID
router.get('/:id', authMiddleware.accountAuth, userController.getById);

// POST create a new user
router.post('/', userController.create);

// PUT update a user by ID
router.put('/:id', authMiddleware.accountAuth, userController.update);

// DELETE delete a user by ID
router.delete('/:id', authMiddleware.accountAuth, userController.delete);

module.exports = router;
