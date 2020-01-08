const bcrypt = require('bcrypt');

module.exports = class Users {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('users');
  }

  addUser(newUser) {
    const {
      userID,
      firstname,
      lastname,
      nickname,
      email,
      image,
    } = newUser;
    // Save resource
    return this.collection.insertOne(newUser);
  }

  getUsers(userIDs) {
    // Find all users objects by userIDs array
    return this.collection.find({ userID: { $in: userIDs } }).toArray();
  }

  findUser(userID) {
    // Find user by userID
    return this.collection.findOne({ userID });
  }

  updateUser(user) {
    const { userID } = user;
    // Create object with needed fields and assign userID
    return this.collection.updateOne({ userID }, { $set: user });
  }

  deleteUser(userID) {
    // Delete user by userID
    return this.collection.deleteOne({ userID });
  }

  verifyPassword(user, password) {
    return bcrypt.compare(password, user.passwordHash);
  }
};
