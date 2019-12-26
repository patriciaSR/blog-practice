const express = require('express');
const cors = require('cors');

const repository = require('./repository/');

const postsRouter = require('./controllers/postsRouter');
const commentsRouter = require('./controllers/commentsRouter');
const offensiveRouter = require('./controllers/offensiveRouter');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/offensive-words', offensiveRouter);

async function main() {
  await repository.connect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
