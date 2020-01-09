const bcrypt = require('bcrypt');

module.exports = class Users {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('users');
  }

  async addUser(newUser) {
    const {
      userID,
      firstname,
      lastname,
      username,
      email,
      image,
      password,
    } = newUser;

    const userOnDataBase = await this.collection.findOne({ $or: [{ username }, { email }] });

    if (!userOnDataBase) {
      const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
      delete newUser.password;
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

  async updateUser(user) {
    // check new nickname, new email and old and new password
    const { userID, username, email } = user;
    const isUserOnDataBase = await this.collection.findOne({ $or: [{ username }, { email }] });

    if (isUserOnDataBase) {
      return new Error('Ese usuario/email ya existe');
    } else if (user.newPassword) {
      const userDBInfo = await this.collection.findOne({ userID });
      const checkPassword = bcrypt.compare(user.oldPassword, userDBInfo.passwordHash);
      if (checkPassword) {
        const newPasswordHash = await bcrypt.hash(user.newPassword, bcrypt.genSaltSync(8), null);
        delete user.newPassword;
        user.passwordHash = newPasswordHash;
      }
    }
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
