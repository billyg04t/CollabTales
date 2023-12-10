const { User, Contribution, Story } = require('../models');
const { signToken, AuthenticationError } = require('../JWT/auth');

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => User.findById(userId),
    getContribution: async (_, { contributionId }) => Contribution.findById(contributionId),
    getStory: async (_, { storyId }) => {
      const story = await Story.findById(storyId).populate('author').populate({
        path: 'contributions',
        populate: { path: 'author' }
      });

      return story;
    },
    hello: () => "Hello, world!",
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (_, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user.id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('User not authenticated');
    },
    createStory: async (_, { title, content }, context) => {
      if (context.user) {
        const story = await Story.create({
          title,
          content,
          author: context.user.id,
        });

        return story;
      }

      throw new AuthenticationError('User not authenticated');
    },
    updateStory: async (_, { id, title, content }, context) => {
      if (context.user) {
        return Story.findByIdAndUpdate(
          id,
          { $set: { title, content } },
          { new: true }
        );
      }

      throw new AuthenticationError('User not authenticated');
    },
    addContribution: async (_, { userId, storyId, content }, context) => {
      if (context.user) {
        const contribution = await Contribution.create({
          author: context.user.id,
          content,
        });

        await Story.findByIdAndUpdate(storyId, {
          $push: { contributions: contribution },
        });

        return contribution;
      }

      throw new AuthenticationError('User not authenticated');
    },
    // Add other mutation resolvers as needed
  },

  // Additional resolvers for relationships between types (if any)
  User: {
    contributions: async (user) => Contribution.find({ author: user.id }),
    // Add other user-related resolvers as needed
  },

  Story: {
    contributions: async (story) => Contribution.find({ _id: { $in: story.contributions } }),
    // Add other story-related resolvers as needed
  },

  Contribution: {
    author: async (contribution) => User.findById(contribution.author),
    // Add other contribution-related resolvers as needed
  },
};

module.exports = resolvers;
