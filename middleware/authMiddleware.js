const jwt = require('jsonwebtoken');

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from the headers
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key_here'); // Use the secret directly here
    req.user = decoded; // Attach the user information to the request
    next(); // Move to the next middleware/route
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware for checking if user is admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
