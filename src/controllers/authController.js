const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      if (bcrypt.compareSync(password, user.password)) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            email: user.email,
            uid: user.id
        }
    
        const token = jwt.sign(data, jwtSecretKey, {expiresIn: '15min'});
      
        return res.send(token);
      }

      return res.status(404).json({ error: 'Wrong password' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();