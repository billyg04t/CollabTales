const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const login = mongoose.model('Login', loginSchema);

module.exports = login;