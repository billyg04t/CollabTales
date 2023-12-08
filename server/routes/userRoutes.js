// userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/user/:id', (req, res) => {
  // Assuming you have a GraphQL client on the frontend
  // You can send queries to fetch a specific user here
  res.send(`User route for ID: ${req.params.id}`);
});

module.exports = router;