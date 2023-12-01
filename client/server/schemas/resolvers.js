const { Stories, Matchup } = require('../models');

const resolvers = {
  Query: {
    stories: async () => {
      return Stories.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, storyNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`story${storyNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
