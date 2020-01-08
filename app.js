const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

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

// openssl req -nodes -new -x509 -keyout server.key -out server.cert es la forma de generar el certificado de mentira
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app).listen(3443, () => {
  console.log("Https server started in port 3443");
});

async function main() {
  await repository.connect();

  await repository.checkDefault();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
