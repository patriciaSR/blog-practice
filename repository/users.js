const mongoose = require('mongoose');

module.exports = class Users {
  constructor(connection, userSchema) {
    this.connection = connection;
    this.collection = mongoose.model('users', userSchema);
  }

  addUser(user) {
    const { userID, firstname, lastname, nickname, email, image } = user;

    const newUser = {
      userID,
      firstname,
      lastname,
      nickname,
      email,
      image,
    };
    // Save resource
    const userMongoose = new this.collection(newUser);
    return userMongoose.save();
  }

  getUsersById(userIDs) {
    return this.collection.find({ userID: { $in: userIDs } }).exec();
  }

  findUser(userID) {
    return this.collection.find({ userID }).exec();
  }

  updateUser(user) {
    const { userID, firstname, lastname, nickname, email, image } = user;

    const newUser = {
      userID,
      firstname,
      lastname,
      nickname,
      email,
      image,
    };

    // Create object with needed fields and assign id
    return this.collection.updateOne({ userID }, { $set: newUser });
  }

  deleteUser(userID) {
    return this.collection.deleteOne({ userID });
  }
};
