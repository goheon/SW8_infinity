const { Router } = require('express');
const passport = require('passport');
const { setUserToken } = require('../utils/jwt');
const router = Router();

router.post(
  '/',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    if (req.user) {

      setUserToken(res, req.user);
    }
    res.end();
  }
);

module.exports = router;
