const { User, Contribution, Story } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { hashPassword, comparePasswords } = require('../utils/authService');

const secret = 'your-secret-key'; // Replace with your actual secret key

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

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    recentStories: async () => {
      // Assuming you have a "created_at" field in your Story model
      const recentStories = await Story.find().sort({ created_at: -1 }).limit(10);
      return recentStories;
    },  
  },

  Mutation: {
    addUser: async (parent, { username, email, password}) => {
      // Hash the password before storing it

      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('Received login request with email:', email);
      console.log('Login Attempt with Email:', email);
    
      const user = await User.findOne({ email });
      console.log('Hashed Password in the Database:', user.password);
    
      if (!user) {
        console.error('User not found for email:', email);
        throw new AuthenticationError('Invalid email or password');
      }
    
      // Compare the provided password with the hashed password from the database
      const correctPw = user.isCorrectPassword(password) //await comparePasswords(password, user.password);
    
      console.log('Entered Password:', password);
      //console.log('Hashed Password in Database:', user.password);

if (!correctPw) {
  console.error('Incorrect password for email:', email);
  throw new AuthenticationError('Invalid email or password');
}
    
      // Create the token
      const token = signToken(user);
    
      console.log('Login successful for email:', email);
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
    addStory: async (_, { title, content, genre, username }, context) => {
      try {
        if (context.user) {
          // Use the authenticated user's username if not provided
          const authorUsername = username || context.user.username;
  
          // Find the user by username
          const user = await User.findOne({ username: authorUsername });
  
          if (!user) {
            throw new Error('User not found');
          }
  
          const story = await Story.create({
            title,
            content,
            genre,
            author: user,
          });
  
          return story;
        } else {
          throw new AuthenticationError('User not authenticated');
        }
      } catch (error) {
        console.error('Error adding story:', error);
        throw error;
      }
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
    addContribution: async (_, { userId, storyId, title, content }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('User not authenticated');
        }

        // Use provided userId or fallback to the authenticated user's ID
        const authorId = userId || context.user.id;

        // Create a new contribution
        const contribution = await Contribution.create({
          user: authorId,
          title: title || null, // If no title is provided, set it to null
          content,
        });

        // If a storyId is provided, add the contribution to the story
        if (storyId) {
          await Story.findByIdAndUpdate(storyId, {
            $push: { contributions: contribution },
          });
        }

        return contribution;
      } catch (error) {
        console.error('Error adding contribution:', error);
        throw error;
      }
    },
    // Additional resolvers for relationships between types (if any)
  },

  User: {
    contributions: async (user) => Contribution.find({ author: user.id }),
    // Add other user-related resolvers as needed
  },

  Story: {
    contributions: async (story) => Contribution.find({ _id: { $in: story.contributions } }),
    author: async (story) => User.findById(story.author),

    // Add other story-related resolvers as needed
  },

  Contribution: {
    author: async (contribution) => User.findById(contribution.user),
    // Add other contribution-related resolvers as needed
  },
};

module.exports = resolvers;