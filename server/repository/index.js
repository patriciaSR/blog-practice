// Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;

const Posts = require('./posts');
const Comments = require('./comments');
const OffensiveWords = require('./offensiveWords');
const Users = require('./users');


const defaultWords = require('../src/data/defaultWords');
const defaultUsers = require('../src/data/defaultUsers');

const url = 'mongodb://localhost:27017/blogDB';

module.exports = {
  async connect() {
    const connection = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to Mongo");

    this.posts = new Posts(connection);
    this.comments = new Comments(connection);
    this.offensiveWords = new OffensiveWords(connection);
    this.users = new Users(connection);
  },

  async checkDefault() {
    const offensiveWords = await this.offensiveWords.getAllWords();

    if (!offensiveWords.length) {
      await this.offensiveWords.addDefaultWords(defaultWords);
    }

    const users = await this.users.getAllUsers();

    if (!users.length) {
      defaultUsers.forEach(async (user) => {
        this.users.addUser(user);
      });
    }
  },
};
