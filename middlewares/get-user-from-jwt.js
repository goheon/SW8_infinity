const passport = require('passport');
const { AuthError } = require('../middlewares/error-handler');

module.exports = (req, res, next) => {
  if (!req.cookies.token) {
    throw new AuthError();
  }

  return passport.authenticate('jwt', { session: false })(req, res, next);
};
