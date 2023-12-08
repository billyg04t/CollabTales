const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Make sure to import your User model

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Perform form validation (e.g., check if passwords match)
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user
    const newUser = await User.create({ username, password });

    // You might want to generate and send a JWT token here for authentication

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;