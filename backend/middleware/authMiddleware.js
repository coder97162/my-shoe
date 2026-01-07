const jwt = require('jsonwebtoken');

// JWT Secret Key (should match the one in auth.js)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // If no token provided
  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    // Continue to next middleware/route
    next();
  });
};

module.exports = authenticateToken;



