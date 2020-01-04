const ObjectId = require('mongodb').ObjectId;

module.exports = class Posts {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('posts');
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
    return this.collection.insertOne(newPost);
  }

  getAllPosts() {
    return this.collection.find().toArray();
  }

  getPostByID(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
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
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newPost });
  }

  deletePostById(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
};
