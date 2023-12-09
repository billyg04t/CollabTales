const { User, Story, Contribution, Login }= require('../models'); 

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
      createUser: async (_, { username, email, password }) => {
        // You may want to add validation logic here before creating the user
        const newUser = await User.create({
          username,
          email,
          password,
        });
  
        return newUser;
      },
      loginUser: async (_, { email, password }) => {
        // Find the user with the provided email
        const user = await User.findOne({ email });
  
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