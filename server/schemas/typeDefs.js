const typeDefs = `
  scalar Date
  type User {
    _id: ID!
    username: String!
    email: String!
    contributions: [Contribution]
  }

  type Contribution {
    _id: ID!
    user: User
    title: String
    content: String
    created_at: Date
    author: User  # Add this line
  }

  type Story {
    _id: ID!
    title: String!
    content: String!
    genre: String!
    author: User
    contributions: [Contribution]
    created_at: Date
  }


  type Query {
    getUser(userId: ID): User
    getContribution(contributionId: ID!): Contribution
    getStory(storyId: ID!): Story
    hello: String
    me: User
    recentStories: [Story]
   }

   type AuthPayload {
    token: String
    user: User
  }
  

   type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, username: String, email: String, password: String): User
    addStory(title: String!, content: String!, genre: String!, authorId: ID!): Story
    updateStory(id: ID!, title: String, content: String, genre: String): Story
    addContribution(storyId: ID!, content: String!): Contribution
    login(email: String!, password: String!): AuthPayload
    # Add other mutations as needed
  
  }
  `;
  

module.exports = typeDefs;