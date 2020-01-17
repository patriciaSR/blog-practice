const fs = require('fs');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;

const app = require('./appServer.js');

// repository DB
const repository = require('./repository');

// server.js
async function main() {
  const url = 'mongodb://localhost:27017/blogDB';
  const connection = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await repository.connect(connection);

  await repository.checkDefault();

  // to create a new autogenerated false safe certificate
  // openssl req -nodes -new -x509 -keyout server.key -out server.cert
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  }, app).listen(3443, () => {
    console.log('Https server started in port 3443');
  });
}

main();
