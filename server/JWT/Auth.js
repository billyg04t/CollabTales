const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const commonSecret = 'your-common-secret-key';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return this.AuthenticationError; // Return AuthenticationError if no token is present
    }

    try {
      const { authenticatedPerson } = jwt.verify(token, commonSecret, { maxAge: expiration });
      req.user = authenticatedPerson;
    } catch (error) {
      console.log('Invalid token:', error.message);
      return this.AuthenticationError; // Return AuthenticationError for invalid tokens
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign(payload, commonSecret, { expiresIn: expiration });
  },
};
