const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

// Import your routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const homeRoutes = require('./routes/homeRoutes');
const notFoundRoutes = require('./routes/notfoundRoutes');
const signupRoutes = require('./routes/signupRoutes');
const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');

const { typeDefs, resolvers } = require('./schemas/');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Mount the Apollo middleware
app.use('/graphql', expressMiddleware(server));

// Use JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount your routes
app.use('/dashboard', dashboardRoutes);
app.use('/home', homeRoutes);
app.use('/notfound', notFoundRoutes);
app.use('/signup', signupRoutes);
app.use('/story', storyRoutes);
app.use('/user', userRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle all other routes by serving the main HTML file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});

