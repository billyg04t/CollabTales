// dashboardRoutes.js
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  // Assuming you have a GraphQL client on the frontend
  // You can send queries/mutations to your GraphQL server here
  res.send('Dashboard route');
});

router.post('/dashboard/create-story', (req, res) => {
  // Assuming you have a GraphQL client on the frontend
  // You can send mutations to create a new story here
  res.send('Create Story route');
});

module.exports = router;