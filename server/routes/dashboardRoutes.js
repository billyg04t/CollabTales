const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');

router.get('/dashboard', async (req, res) => {
  try {
    // Fetch recent stories and user information
    const recentStories = await Story.find().sort({ created_at: 'desc' }).limit(5);
    const user = await User.findById(req.user._id).select('username'); 


    res.status(200).json({
      user: {
        username: user.username,
      },
      recentStories,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;