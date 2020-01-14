const express = require('express');

const authRouter = express.Router({ mergeParams: true });

// passport and jwt authentication
const jwt = require('jsonwebtoken');
const passport = require('./../src/passport');

const SECRET_KEY = 'SECRET_KEY';

authRouter.all('/',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const { username } = req.user;

    const opts = { expiresIn: 6000 }; // token expires in 100min
    const token = jwt.sign({ username }, SECRET_KEY, opts);

    return res.status(200).json({ message: 'Auth Passed', token });
  });

module.exports = authRouter;
