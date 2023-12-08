const React = require('react');
const { useState } = require('react');
const { useQuery } = require('@apollo/client');
const { Link, Route, Switch } = require('react-router-dom');

// Assuming you have a query for recent stories
const { GET_RECENT_STORIES } = require('../utils/queries');

router.get('/dashboard', (req, res) => {
  const { loading: storiesLoading, data: storiesData } = useQuery(GET_RECENT_STORIES, {
    fetchPolicy: 'no-cache',
  });

  const recentStories = storiesData?.recentStories || [];

  res.status(200).json({ storiesLoading, recentStories });
});

router.post('/dashboard/create-story', (req, res) => {
  const { newStoryTitle } = req.body;

  try {
    // Call your API endpoint to create a new story here
    // Example: const response = await createStoryMutation({ variables: { title: newStoryTitle } });

    // For simplicity, let's log the new story title for now
    console.log('New story created:', newStoryTitle);

    res.status(201).json({ message: 'Story created successfully' });
  } catch (error) {
    console.error('Error creating a new story:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;