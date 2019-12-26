const express = require('express');
const cors = require('cors');

const postsRouter = require('./controller/postsRouter');
const repository = require('./repository/');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());

app.use('./controller/postsRouter.js', postsRouter);

app.use('/posts', postsRouter);


async function main() {
  await repository.connect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
