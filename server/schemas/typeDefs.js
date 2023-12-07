const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    contributions: [Contribution]
  }

  type Contribution {
    _id: ID!
    user: User
    story: Story
    content: String
    created_at: Date
  }

  type Story {
    _id: ID!
    title: String!
    content: String!
    genre: String!
    tags: [ID] # Assuming Tag is a simple ID reference
    author: User
    contributions: [Contribution]
    created_at: Date
  }


  extend type Query {
    getUser(userId: ID!): User
    getContribution(contributionId: ID!): Contribution
    getStory(storyId: ID!): Story
   }

  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createContribution(userId: ID!, storyId: ID!, content: String!): Contribution
    createStory(title: String!, content: String!, genre: String!, authorId: ID!): Story
    # Add other mutations as needed
  }
`;

module.exports = typeDefs;
