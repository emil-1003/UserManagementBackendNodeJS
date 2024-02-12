const jwt = require('jsonwebtoken');

class AuthMiddleware {
  // Define your middleware methods here
  DEFAULT_ROLE_ID = 2
  ADMIN_ROLE_ID = 1

  verifyToken(token) {
    try {
      return jwt.verify(token.split(" ")[1], config.JWT_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

 userAuth(req, res, next) {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    const decoded = this.verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    next();
  }

  adminAuth(req, res, next) {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }

    const decoded = this.verifyToken(token);
    if (!decoded || decoded.role_id !== ADMIN_ROLE_ID) {
      return res.status(404).json({ message: 'You do not have permission.' });
    }
    
    next();
  }

  accountAuth(req, res, next) {
    const token = req.header("Authorization");
    const reqUid = req.params.id;
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    const decoded = this.verifyToken(token);
    if (!decoded || (decoded.role_id !== 1 && decoded.uid !== reqUid)) {
      return res.status(404).json({ message: 'This is not your account.' });
    }
    
    next();
  }
}

module.exports = new AuthMiddleware();
