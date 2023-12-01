const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');
const bodyParser = require('body-parser');
const authenticateToken = require('./auth');
const generateToken = require('./generate');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collabtale', { useNewUrlParser: true, useUnifiedTopology: true });

// Define GraphQL Schema
const schema = buildSchema(`
  type Contribution {
    id: ID!
    text: String!
    author: String!
  }

  type Query {
    contributions: [Contribution]
  }

  type Mutation {
    addContribution(text: String!, author: String!): Contribution
  }
`);

// In-memory storage (replace with MongoDB)
const contributions = [];

// Define GraphQL Resolvers
const root = {
  contributions: async () => {
    try {
      const contributions = await Contribution.find();
      return contributions;
    } catch (error) {
      console.error('Error fetching contributions:', error.message);
      throw new Error('Failed to fetch contributions');
    }
  },
  addContribution: async ({ text, author }) => {
    try {
      const newContribution = new Contribution({ text, author });
      await newContribution.save();
      return newContribution;
    } catch (error) {
      console.error('Error adding contribution:', error.message);
      throw new Error('Failed to add contribution');
    }
  },
};

// Create Express App
const app = express();

app.post('/login', (req, res) => {
  // Implement your login logic, validate credentials, etc.
  // If login is successful, generate and send a JWT token
  const userId = 'some-user-id'; // Replace with the actual user ID
  const token = generateToken(userId);
  res.json({ token });
});
// Middleware
app.use(bodyParser.json());

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphQL UI for testing
}));

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
