const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET_KEY';

const repository = require('./repository/');

const postsRouter = require('./controllers/postsRouter');
const commentsRouter = require('./controllers/commentsRouter');
const offensiveRouter = require('./controllers/offensiveRouter');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());
// passport authentication
app.use(passport.initialize());

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

app.all('/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const { username } = req.user;

    const opts = { expiresIn: 120 }; // token expires in 2min
    const token = jwt.sign({ username }, SECRET_KEY, opts);

    return res.status(200).json({ message: 'Auth Passed', token });
  });

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

app.use('/posts', passport.authenticate('jwt', { session: false }), postsRouter);
app.use('/posts/:id/comments', passport.authenticate('jwt', { session: false }), commentsRouter);
app.use('/offensive-words', passport.authenticate('jwt', { session: false }), offensiveRouter);

// openssl req -nodes -new -x509 -keyout server.key -out server.cert es la forma de generar el certificado de mentira
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app).listen(3443, () => {
  console.log('Https server started in port 3443');
});

async function main() {
  await repository.connect();

  await repository.checkDefault();

  // add new user with passwordhash
  // const newUser = {
  //   userID: '2a',
  //   firstname: 'pancho',
  //   lastname: 'perez',
  //   username: 'pancho22',
  //   password: 'pancho22',
  //   email: 'pancho22@gmail.com',
  //   image: 'kadasad',
  // };

  // await repository.users.addUser(newUser);
}

main();
