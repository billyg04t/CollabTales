const bcrypt = require('bcrypt');


async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

module.exports = { hashPassword, comparePasswords };