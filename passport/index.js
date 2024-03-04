const passport = require('passport');
const local = require('./strategy/local');
const jwt = require('./strategy/jwt');

module.exports = () => {
  passport.use(local);
  passport.use(jwt);
};
