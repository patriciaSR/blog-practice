const express = require('express');

const postsRouter = express.Router();

const repository = require('../repository');
const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../src/utils/onlyUsers');


postsRouter.post('/', async (req, res) => {
  const post = req.body;
  post.date = new Date();
  const {
    title,
    content,
    date,
    tags,
    categories,
    image,
    userID,
  } = post;

  if (!content && !title && !userID) {
    res.sendStatus(400);
  } else {
    await repository.posts.addPost(post);
    res.json(post);
  }
});

postsRouter.get('/', async (req, res) => {
  const allPosts = await repository.posts.getAllPosts();
  res.json(allPosts);
});

postsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.getPost(id);
  const comments = await repository.comments.getCommentsPost(id);

  const onlyUserIDs = getOnlyUsersIDs(post, comments);

  const onlyUserInfo = await repository.users.getUsers(onlyUserIDs);

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
  const post = await repository.posts.deletePost(id);
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
  const post = await repository.posts.getPost(id);

  if (!post) {
    res.sendStatus(404);
  } else {
    const postReq = req.body;
    postReq.date = new Date();
    const {
      title,
      content,
      date,
      tags,
      categories,
      image,
      userID,
    } = postReq;

    if (!title && !content && !userID) {
      res.sendStatus(400);
    } else {
      await repository.posts.updatePost(id, postReq);
      res.json(postReq);
    }
  }
});

module.exports = postsRouter;
