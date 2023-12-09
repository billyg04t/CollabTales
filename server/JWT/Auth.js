
const { User, Login } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Don't forget to import jwt

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

const createUser = async (username, email, password) => {
  // New createUser function
  const newUser = await User.create({
    username,
    email,
    password,
  });

  return newUser;
};

const login = async (email, password) => {
  // New login function
  const user = await Login.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  return user;
};

module.exports = { authenticateToken, createUser, login };