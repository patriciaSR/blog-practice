const express = require('express');
const cors = require('cors');

// passport and middlewares
const passport = require('./utils/passport');
const isRoleAllowed = require('./middlewares/isRoleAllowed');

// routers
const postsRouter = require('./controllers/postsRouter');
const commentsRouter = require('./controllers/commentsRouter');
const offensiveRouter = require('./controllers/offensiveRouter');
const authRouter = require('./controllers/authRouter');
const signupRouter = require('./controllers/signupRouter');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());

// init passport authentication
app.use(passport.initialize());

// routes
app.use('/login', authRouter);
app.use('/signup', signupRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/offensive-words', passport.authenticate('jwt', { session: false }), isRoleAllowed, offensiveRouter);

module.exports = app;
