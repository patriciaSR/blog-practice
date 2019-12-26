const ObjectId = require('mongodb').ObjectId;

module.exports = class Posts {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('comments');
  }

  addComment(comment) {
    const { content, date, userID, postID } = comment;

    const newComment = {
      content,
      date,
      userID,
      postID,
    };
    // Save resource
    return this.collection.insertOne(newComment);
  }

  getCommentsPost(postID) {
    return this.collection.find({ postID }).toArray();
  }

  findComment(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  updateComment(id, comment) {
    const { content, date, userID, postID } = comment;

    const newComment = {
      content,
      date,
      userID,
      postID,
    };

    // Create object with needed fields and assign id
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newComment });
  }

  deleteCommentById(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  deleteComentsPostById(idPost) {
    return this.collection.deleteMany({ postID: idPost });
  }
};
