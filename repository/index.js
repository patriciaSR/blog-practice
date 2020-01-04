// Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;
const mysql = require('mysql2/promise');

const Posts = require('./posts');
const Comments = require('./comments');
const OffensiveWords = require('./offensiveWords');
const Users = require('./users');


const defaultWords = require('../src/data/defaultWords');

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
    this.users = new Users(connection);
  },

  async mysqlConnect() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'pass',
      database: 'offensiveWordsBD',
    });

    console.log("Connected to MySQL");

    this.offensiveWords = new OffensiveWords(connection);

  },

  async checkDefault() {
    const offensiveWords = await this.offensiveWords.getAllWords();

    if (!offensiveWords.length) {
      await this.offensiveWords.addDefaultWords(defaultWords);
    }
  },
};
