const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

module.exports = class Posts {
  constructor(connection, postSchema) {
    this.connection = connection;
    this.collection = mongoose.model('posts', postSchema);
  }

  addPost(post) {
    const { title, content, date, tags, categories, image, userID } = post;

    const newPost = {
      title,
      content,
      date,
      tags,
      categories,
      image,
      userID,
    };
    // Save resource
    const postMongoose = new this.collection(newPost);
    return postMongoose.save();
  }

  getAllPosts() {
    return this.collection.find().exec();
  }

  getPostByID(id) {
    return this.collection.findById(new ObjectId(id));
  }

  updatePost(id, post) {
    const { title, content, date, tags, categories, image, userID } = post;
    const newPost = {
      title,
      content,
      date,
      tags,
      categories,
      image,
      userID,
    };
    // Create object with needed fields and assign id
    return this.collection.findByIdAndUpdate(new ObjectId(id), { $set: newPost });
  }

  deletePostById(id) {
    return this.collection.findByIdAndDelete(new ObjectId(id));
  }
};
