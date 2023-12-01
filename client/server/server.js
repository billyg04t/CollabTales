const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');

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
  contributions: () => contributions,
  addContribution: ({ text, author }) => {
    const newContribution = { id: contributions.length + 1, text, author };
    contributions.push(newContribution);
    return newContribution;
  },
};

// Create Express App
const app = express();

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
