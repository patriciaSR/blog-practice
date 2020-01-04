// Módulo que contendrá el código de acceso a la base de datos.
const mongoose = require('mongoose');

const Posts = require('./posts');
const Comments = require('./comments');
const OffensiveWords = require('./offensiveWords');
const Users = require('./users');


const defaultWords = require('../src/data/defaultWords');

const url = 'mongodb://localhost:27017/blogDB';

module.exports = {
  async connect() {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    const postSchema = new mongoose.Schema({
      title: String,
      content: String,
      date: Date,
      tags: Array,
      categories: Array,
      image: String,
      userID: String,
    });

    const commentSchema = new mongoose.Schema({
      content: String,
      date: Date,
      userID: String,
      postID: String,
    });

    const offensiveSchema = new mongoose.Schema({
      word: String,
      level: Number,
    });

    const userSchema = new mongoose.Schema({
      userID: String,
      firstname: String,
    });


    console.log("Connected to Mongo");

    this.posts = new Posts(connection, postSchema);
    this.comments = new Comments(connection, commentSchema);
    this.offensiveWords = new OffensiveWords(connection, offensiveSchema);
    this.users = new Users(connection, userSchema);
  },

  async checkDefault() {
    const offensiveWords = await this.offensiveWords.getAllWords();
    console.log(offensiveWords);

    if (!offensiveWords.length) {
      await this.offensiveWords.addDefaultWords(defaultWords);
    }
  },
};
