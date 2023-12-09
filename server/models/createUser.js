const { User } = require('../models');

Mutation: {
  createUser: async (_, { username, email, password }) => {
    const createUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    return createUser;
  }
};

module.exports = createUser;