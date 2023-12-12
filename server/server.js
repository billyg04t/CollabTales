const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schema and model for stories
const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Story = mongoose.model('Story', storySchema);

// Define Mongoose schema and model for users
const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model('User', userSchema);

const typeDefs = gql`
  type Story {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type User {
    _id: ID!
    username: String!
  }

  type Mutation {
    createStory(title: String!, content: String!): Story
    registerUser(username: String!): User
  }

  type Query {
    getStories: [Story]
    getUsers: [User]
  }
`;

const resolvers = {
  Mutation: {
    createStory: async (_, { title, content }, { user }) => {
      // Check if user is authenticated
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create and save the story
      const story = new Story({
        title,
        content,
        author: user._id,
      });
      await story.save();

      return story;
    },
    registerUser: async (_, { username }) => {
      // Create and save the user
      const user = new User({ username });
      await user.save();

      return user;
    },
  },
  Query: {
    getStories: () => Story.find().populate('author'),
    getUsers: () => User.find(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user from the request (assuming you have implemented authentication middleware)
    const user = req.user;
    return { user };
  },
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
