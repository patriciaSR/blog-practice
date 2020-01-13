const express = require('express');
const passport = require('passport');

const commentsRouter = express.Router({ mergeParams: true });

const ObjectId = require('mongodb').ObjectId;

const repository = require('../repository/');

const haveOffensiveWords = require('../src/utils/validator');


commentsRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const comment = req.body;
  comment.userID = req.user._id;
  comment.postID = new ObjectId(req.params.id);
  comment.date = new Date();
  const { content, userID } = comment;

  const offensiveWords = await repository.offensiveWords.getAllWords();
  const notAllowedWords = haveOffensiveWords(content, offensiveWords);

  if (!content && !userID) {
    res.sendStatus(400);
  } else if (notAllowedWords.length !== 0) {
    const errorText = 'Tu comentario no puede contener palabras ofensivas';
    res.status(400).send({ errorText, notAllowedWords });
  } else {
    await repository.comments.addComment(comment);
    res.json(comment);
  }
});

commentsRouter.delete('/:commentID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const postID = req.params.id;
  const commentID = req.params.commentID;
  const reqUserID = req.user._id.toString();

  const post = await repository.posts.getPost(postID);
  const postUserID = post.userID.toString();
 
  const comment = await repository.comments.findComment(commentID);
  const commentUserID = comment.userID.toString();

  if (req.user.role === 'admin' || reqUserID === postUserID || reqUserID === commentUserID) {
    const deletedComment = await repository.comments.deleteComment(commentID);
    if (!deletedComment) {
      res.sendStatus(404);
    } else {
      res.json(deletedComment);
    }
  } else {
    res.status(403).send('No puedes borrar este comentario');
  }
});

commentsRouter.put('/:commentID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const commentID = req.params.commentID;
  const reqUserID = req.user._id.toString();
  
  const comment = await repository.comments.findComment(commentID);
  const commentUserID = comment.userID.toString();

  if (req.user.role === 'admin' || reqUserID === commentUserID) {
    if (!comment) {
      res.sendStatus(404);
    } else {
      const commentReq = req.body;
      commentReq.userID = req.user._id;
      commentReq.date = new Date();
      const { content, userID } = commentReq;

      if (!content && !userID) {
        res.sendStatus(400);
      } else {
        await repository.comments.updateComment(commentID, commentReq);
        res.json(commentReq);
      }
    }
  } else {
    res.status(403).send('No puedes modificar este comentario');
  }
});

module.exports = commentsRouter;