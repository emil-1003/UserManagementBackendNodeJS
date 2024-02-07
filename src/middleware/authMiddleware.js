const jwt = require('jsonwebtoken');

class AuthMiddleware {
  // Define your middleware methods here
 userAuth(req, res, next) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    try {
      jwt.verify(token.split(" ")[1], jwtSecretKey);
    } catch {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
      next();
  }

  adminAuth(req, res, next) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    try {
      jwt.verify(token.split(" ")[1], jwtSecretKey);
    } catch {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    var decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    if (decoded.role_id != 1) {
      return res.status(404).json({ message: 'You do not have permission.' });
    }
    
      next();
  }

  accountAuth(req, res, next) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header("Authorization");
    const reqUid = req.params.id;
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required.' });
    }
  
    try {
      jwt.verify(token.split(" ")[1], jwtSecretKey);
    } catch {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    var decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    if (decoded.role_id != 1 && decoded.uid != reqUid) {
      return res.status(404).json({ message: 'This is not your account.' });
    }
    
      next();
  }
}

module.exports = new AuthMiddleware();
