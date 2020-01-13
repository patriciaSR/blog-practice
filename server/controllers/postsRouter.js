const express = require('express');
const passport = require('passport');

const postsRouter = express.Router();

const repository = require('../repository');
const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../src/utils/onlyUsers');


postsRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const post = req.body;
  post.userID = req.user._id;
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

  if (!post) {
    res.sendStatus(404);
  } else {
    const onlyUserIDs = getOnlyUsersIDs(post, comments);

    const onlyUserInfo = await repository.users.getUsers(onlyUserIDs);

    const userPostInfo = getUserPostInfo(post.userID, onlyUserInfo);

    const completeCommentsInfo = getUserCommentsInfo(comments, onlyUserInfo);

    post.userInfo = userPostInfo;
    post.comments = completeCommentsInfo;
    res.json(post);
  }
});

postsRouter.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.getPost(id);

  if (!post) {
    res.sendStatus(404);
  } else if (req.user.role === 'admin' || req.user._id.toString() === post.userID.toString()) {
    const deletedPost = await repository.posts.deletePost(id);
    const comments = await repository.comments.deleteComentsPostById(id);
    deletedPost.comments = comments;
    res.json(deletedPost);
  } else {
    res.status(403).send('No puedes borrar un post que no es tuyo');
  }
});

postsRouter.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params.id;

  const post = await repository.posts.getPost(id);

  if (!post) {
    res.sendStatus(404);
  } else if (req.user.role === 'admin' || req.user._id.toString() === post.userID.toString()) {
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
  } else {
    res.status(403).send('No puedes modificar un post que no es tuyo');
  }
});

module.exports = postsRouter;
