const { User, Story, Contribution }= require('../models'); 

const resolvers = {
  Query: {
    user: async () => {
      return await User.findOne().populate('story');
    },
    story: async () => {
      return await Story.findOne().populate('user');
    },
    Contribution: async () => {
      return await Contribution.findOne().populate('story');
    },


  }
};

module.exports = resolvers;