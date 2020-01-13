const express = require('express');

const authRouter = express.Router({ mergeParams: true });

const repository = require('../repository/');

// passport and jwt authentication
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET_KEY';

async function verify(username, password, done) {
  const user = await repository.users.findUser(username);
  
  if (!user) {
    return done(null, false, { message: 'User not found' });
  }
  
  if (await repository.users.verifyPassword(user, password)) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect password' });
  }
}

passport.use(new BasicStrategy(verify));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
  const user = await repository.users.findUser(payload.username);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'User not found' });
  }
}));

authRouter.all('/',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const { username } = req.user;

    const opts = { expiresIn: 600 }; // token expires in 10min
    const token = jwt.sign({ username }, SECRET_KEY, opts);

    return res.status(200).json({ message: 'Auth Passed', token });
  });

module.exports = authRouter;