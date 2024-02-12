const auth = require('../utils/auth')

class AuthMiddleware {
 userAuth(req, res, next) {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    const decoded = auth.verifyToken(token);
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

    const decoded = auth.verifyToken(token);
    if (!decoded || decoded.role_id !== auth.ADMIN_ROLE_ID) {
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
  
    const decoded = auth.verifyToken(token);
    if (!decoded || (decoded.role_id !== auth.ADMIN_ROLE_ID && decoded.uid != reqUid)) {
      return res.status(404).json({ message: 'This is not your account.' });
    }
    
    next();
  }
}

module.exports = new AuthMiddleware();
