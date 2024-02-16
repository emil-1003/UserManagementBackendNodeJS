const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { config } = require('../utils/config')
const auth = require('../utils/auth')

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      if (bcrypt.compareSync(password, user.password)) {
        let jwtSecretKey = config.JWT_SECRET_KEY;
        let data = {
            email: user.email,
            uid: user.id,
            role_id: user.role_id
        }
    
        const token = jwt.sign(data, jwtSecretKey, {expiresIn: '15min'});
      
        return res.json({
          token: token
        });
      }

      return res.status(404).json({ error: 'Wrong password' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async newPassword(req, res) {
    const userId = req.params.id;
    const { newpassword } = req.body;
    const token = req.header("Authorization");

    try {
      var decoded = auth.verifyToken(token)
      if (!decoded || (decoded.uid != userId && decoded.role_id !== auth.ADMIN_ROLE_ID)) {
        return res.status(403).json({ error: 'You are not allowed to update other users' });
      }

      const newPasswordHash = bcrypt.hashSync(newpassword, 10);

      await userModel.newPassword(userId/*decoded.uid*/, newPasswordHash);

      return res.json({
        message: "Successfull"
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();