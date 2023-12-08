// notfoundRoutes.js
const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  // Assuming you have a GraphQL client on the frontend
  // You can handle not found routes based on your frontend logic
  res.send('Not Found route');
});

module.exports = router;
