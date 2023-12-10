const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware(req, res, next) {
    try {
      // Ensure that req exists and has headers
      if (!req || !req.headers) {
        return next(new Error('Could not authenticate user.'));
      }

      // Allow token to be sent via req.body, req.query, or headers
      let token = req.body.token || req.query.token || req.headers.authorization;

      // ["Bearer", "<tokenvalue>"]
      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }

      if (!token) {
        // If no token is present, proceed with the request without authentication
        return next();
      }

      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return next(new Error('Could not authenticate user.'));
    }
  },
  signToken({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
