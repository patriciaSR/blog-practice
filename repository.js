// Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/blogDB';

module.exports = {
  async connect() {
    const connection = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to Mongo");

    this.connection = connection;
  },

  getCollection(name) {
    return this.connection.db().collection(name);
  },

  getAllCollections() {
    return {
      posts: this.getCollection('posts'),
      users: this.getCollection('users'),
      comments: this.getCollection('comments'),
      roles: this.getCollection('roles'),
      offensiveWords: this.getCollection('offensiveWords'),
    };
  },
};
