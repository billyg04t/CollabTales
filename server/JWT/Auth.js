const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt/secret');
const authService = require('../services/auth/authService');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = { authenticateToken, ...authService };