const jwt = require('jsonwebtoken');

function generateToken(userId) {
  const payload = { userId };
  const options = { expiresIn: '1h' }; // You can adjust the expiration time

  return jwt.sign(payload, jwtSecret, options);
}

module.export = jwt;