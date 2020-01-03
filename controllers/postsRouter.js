const express = require('express');

const postsRouter = express.Router();

const repository = require('../repository');


postsRouter.post('/', async (req, res) => {
  const post = req.body;
  const { title, content, userID } = post;

  // Validation
  if (!content && !title && !userID) {
    res.sendStatus(400);
  } else {
    // Create object with needed fields and assign id
    await repository.posts.addPost(post);
    // Return new resource
    res.json(post);
  }
});

postsRouter.get('/', async (req, res) => {
  const allPosts = await repository.posts.getAllPosts();
  res.json(allPosts);
});

postsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.getPostByID(id);
  const comments = await repository.comments.getCommentsPost(id);

  getOnlyUsersArray(post, comments);

  if (!post) {
    res.sendStatus(404);
  } else {
    post[0].comments = comments;
    res.json(post);
  }
});

postsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.deletePostById(id);
  const comments = await repository.comments.deleteComentsPostById(id);
  if (!post) {
    res.sendStatus(404);
  } else {
    post.comments = comments;
    res.json(post);
  }
});

postsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.findPost(id);

  if (!post) {
    res.sendStatus(404);
  } else {
    const postReq = req.body;
    const { title, content, userID } = postReq;

    // Validation
    if (!title && !content && !userID) {
      res.sendStatus(400);
    } else {
      await repository.posts.updatePost(id, postReq);
      // Return new resource
      res.json(postReq);
    }
  }
});

module.exports = postsRouter;
