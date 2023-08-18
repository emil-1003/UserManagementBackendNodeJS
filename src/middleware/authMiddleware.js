const jwt = require('jsonwebtoken');

class AuthMiddleware {
  // Define your middleware methods here
 authMiddleware(req, res, next) {
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
}

module.exports = new AuthMiddleware();
