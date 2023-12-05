const typeDefs = `
  type Tech {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    story1: String!
    story2: String!
    story1_votes: Int
    story2_votes: Int
  }

  type Query {
    stories: [String]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(story1: String!, story2: String!): Matchup
    createVote(_id: String!, storyNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
