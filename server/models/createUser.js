const { User } = require('../models');

Mutation: {
  createUser: async (_, { username, password }) => {
    const createUser = await User.create({
      username: username,
      password: password,
    });

    return createUser;
  } 
};

module.exports = createUser;