// appRoutes.js
const express = require('express');
const router = express.Router();

// Import your GraphQL schema and resolvers
const { ApolloServer, gql } = require('apollo-server-express');
const { graphqlExpress } = require('graphql-server-express');
const typeDefs = require('./path-to-your-typedefs-file');
const resolvers = require('./path-to-your-resolvers-file');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app: router, path: '/graphql' });

module.exports = router;