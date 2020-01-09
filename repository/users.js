const bcrypt = require('bcrypt');

module.exports = class Users {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('users');
  }

  async addUser(newUser, password) {
    const {
      userID,
      firstname,
      lastname,
      username,
      email,
      image,
    } = newUser;
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

    const userOnDataBase = await this.collection.findOne({ $or: [{ username }, { email }] });

    if (!userOnDataBase) {
      newUser.passwordHash = passwordHash;
      return this.collection.insertOne(newUser);
    } else {
      const error = new Error('Ese usuario ya existe');
      return error;
    }
  }

  getUsers(userIDs) {
    // Find all users objects by userIDs array
    return this.collection.find({ userID: { $in: userIDs } }).toArray();
  }

  findUser(username) {
    // Find user by userID
    return this.collection.findOne({ username });
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
