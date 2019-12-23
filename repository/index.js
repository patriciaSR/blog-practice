// Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;
const Posts = require('./posts');

const url = 'mongodb://localhost:27017/blogDB';

module.exports = {
  async connect() {
    const connection = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to Mongo");

    this.posts = new Posts(connection);
  },
};
