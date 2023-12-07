const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

router.get('/recent-stories', async (req, res) => {
  try {
    const recentStories = await Story.find().sort({ created_at: 'desc' }).limit(5);
    res.status(200).json({ recentStories });
  } catch (error) {
    console.error('Error fetching recent stories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/create-story', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const authorId = req.user._id;
    const newStory = new Story({ title, author: authorId });
    await newStory.save();

    res.status(201).json({ message: 'Story created successfully' });
  } catch (error) {
    console.error('Error creating a new story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;