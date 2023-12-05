const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const authenticateToken = require('./auth');
const generateToken = require('./generate');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collabtale', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Contribution schema
const contributionSchema = new mongoose.Schema({
  text: String,
  author: String,
});

// Create Contribution model
const Contribution = mongoose.model('Contribution', contributionSchema);

// Define GraphQL schema
const typeDefs = gql`
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
`;

// Define GraphQL resolvers
const resolvers = {
  Query: {
    contributions: async () => {
      try {
        const contributions = await Contribution.find();
        return contributions;
      } catch (error) {
        console.error('Error fetching contributions:', error.message);
        throw new Error('Failed to fetch contributions');
      }
    },
  },
  Mutation: {
    addContribution: async (_, { text, author }) => {
      try {
        const newContribution = new Contribution({ text, author });
        await newContribution.save();
        return newContribution;
      } catch (error) {
        console.error('Error adding contribution:', error.message);
        throw new Error('Failed to add contribution');
      }
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create Express app
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

// Apply the Apollo Server middleware to Express
server.applyMiddleware({ app });

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
