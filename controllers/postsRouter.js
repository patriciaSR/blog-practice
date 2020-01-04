const express = require('express');

const postsRouter = express.Router();

const repository = require('../repository');
const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../src/js/onlyUsers');

postsRouter.post('/', async (req, res) => {
  const post = req.body;
  post.date = new Date();
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

  const onlyUserIDs = getOnlyUsersIDs(post, comments);

  const onlyUserInfo = await repository.users.getUsersById(onlyUserIDs);

  const userPostInfo = getUserPostInfo(post.userID, onlyUserInfo);

  const completeCommentsInfo = getUserCommentsInfo(comments, onlyUserInfo);

  if (!post) {
    res.sendStatus(404);
  } else {
    post.userInfo = userPostInfo;
    post.comments = completeCommentsInfo;
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
  const post = await repository.posts.getPostByID(id);

  if (!post) {
    res.sendStatus(404);
  } else {
    const postReq = req.body;
    postReq.date = new Date();
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
