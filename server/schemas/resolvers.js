const { User, Story, Contribution,}= require('../models'); 

const resolvers = {
  Query: {
    getUser: async () => {
      return await User.findOne().populate('story');
    },
    getStory: async () => {
      return await Story.findOne().populate('user');
    },
    getContribution: async () => {
      return await Contribution.findOne().populate('story');
    },
  },

};
module.exports = resolvers;