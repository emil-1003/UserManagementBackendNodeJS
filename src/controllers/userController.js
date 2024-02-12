const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { config } = require('../utils/config')

class UserController {
  // Samme method er i authMiddleWare - lav EN function i utils til det TODO:
  DEFAULT_ROLE_ID = 2
  ADMIN_ROLE_ID = 1

  verifyToken(token) {
    try {
      return jwt.verify(token.split(" ")[1], config.JWT_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  async getAll(req, res) {
    try {
      const users = await userModel.getAllUsers();

      users.forEach((u) => { delete u.password });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    const userId = req.params.id;

    try {
      const user = await userModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      delete user.password;
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await userModel.getUserByEmail(email);
      if (user) {
        return res.status(404).json({ error: 'Email is taken' });
      }

      const hash = bcrypt.hashSync(password, 10);
      const newUser = await userModel.createUser(name, email, hash);

      delete newUser.password;
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    const userId = req.params.id;
    const { name, email } = req.body;
    const token = req.header("Authorization");

    try {
      const decoded = this.verifyToken(token);
      if (!decoded || (decoded.uid !== userId && decoded.role_id !== this.ADMIN_ROLE_ID)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'You are not allowed to update other users' });
      }

      const emailIsTaken = await userModel.isEmailTakenByOtherUser(userId, email);
      if (emailIsTaken) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Email is taken by other user' });
      }

      const updatedUser = await userModel.updateUser(userId, name, email);
      if (!updatedUser) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }

      delete updatedUser.password;
      res.json(updatedUser);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    const userId = req.params.id;
    const token = req.header("Authorization");

    try {
      const decoded = this.verifyToken(token);
      if (!decoded || (decoded.role_id !== 1 && decoded.uid !== userId)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'You are not allowed to delete other users' });
      }

      const deletedUser = await userModel.deleteUser(userId);
      if (!deletedUser) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }

      delete deletedUser.password;
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
