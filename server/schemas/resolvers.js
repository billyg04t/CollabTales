const { User, Story, Contribution, Login, createUser}= require('../models'); 

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
    Mutation: {
      createUser: async (_, { username, password }) => {
        try {
          const newUser = await User.create({
            username,
            password,
          });
          return newUser;
        } catch (error) {
          console.error("Error creating user:", error);
          throw new Error("Error creating user");
        }
      },
      login: async (_, { email, password }) => {
        // Find the user with the provided email
        const user = await Login.findOne({ email });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        // Compare the provided password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
  
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }
  
        return user;
      },
      // Add other mutations as needed
    },
  };

module.exports = resolvers;