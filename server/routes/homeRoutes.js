// homeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Assuming you have a GraphQL client on the frontend
  // You can send queries to fetch data for the home route here
  res.send('Home route');
});

module.exports = router;
