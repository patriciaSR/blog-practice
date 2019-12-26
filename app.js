const express = require('express');
const cors = require('cors');

const repository = require('./repository/');

const postsRouter = require('./controller/postsRouter');
const commentsRouter = require('./controller/commentsRouter');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());

app.use('./controller/postsRouter.js', postsRouter);

app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);



async function main() {
  await repository.connect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
