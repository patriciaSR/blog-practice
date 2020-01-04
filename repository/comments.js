const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

module.exports = class Comments {
  constructor(connection, commentSchema) {
    this.connection = connection;
    this.collection = mongoose.model('comments', commentSchema);
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
    const commentMongoose = new this.collection(newComment);
    return commentMongoose.save();
  }

  getCommentsPost(postID) {
    return this.collection.find({ postID }).exec();
  }

  findComment(id) {
    return this.collection.findById(new ObjectId(id));
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
    return this.collection.findByIdAndUpdate(new ObjectId(id), { $set: newComment });
  }

  deleteCommentById(id) {
    return this.collection.findByIdAndDelete(new ObjectId(id));
  }

  deleteComentsPostById(idPost) {
    return this.collection.deleteMany({ postID: idPost });
  }
};
