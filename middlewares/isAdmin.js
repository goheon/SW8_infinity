const { AuthError } = require('../middlewares/error-handler');

module.exports = (req, res, next) => {
  const user = req.user;
  if (user.roleId === 'admin') {
    next();
    return;
  }
  //403 error
  throw new AuthError();
};
