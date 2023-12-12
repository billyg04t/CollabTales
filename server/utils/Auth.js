const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, null, null, null, null, null, { code: 'UNAUTHENTICATED' });
    this.name = 'AuthenticationError';
  }
}

module.exports = {
  AuthenticationError,
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // Log the received token
    console.log('Received token:', token);

    try {
      // Verify the token and decode the payload
      const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });

      // Log the decoded payload
      console.log('Decoded payload:', authenticatedPerson);

      // Attach the authenticated user information to the request object
      req.user = authenticatedPerson;
    } catch (error) {
      // Log the error and throw AuthenticationError
      console.error('Invalid token:', error);
      throw new AuthenticationError('Could not authenticate user.');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
