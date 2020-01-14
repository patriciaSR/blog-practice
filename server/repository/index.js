const Posts = require('./posts');
const Comments = require('./comments');
const OffensiveWords = require('./offensiveWords');
const Users = require('./users');


const defaultWords = require('../utils/data/defaultWords');
const defaultUsers = require('../utils/data/defaultUsers');

module.exports = {
  async connect(connection) {
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
