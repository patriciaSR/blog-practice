const ObjectId = require('mongodb').ObjectId;

module.exports = class Users {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('users');
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
    return this.collection.insertOne(newUser);
  }

  getUsersById(userIDs) {
    return this.collection.find({ userID: { $in: userIDs } }).toArray();
  }

  findUser(userID) {
    return this.collection.findOne({ userID });
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
