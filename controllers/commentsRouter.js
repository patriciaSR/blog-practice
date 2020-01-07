const express = require('express');

const commentsRouter = express.Router();

const repository = require('../repository/');

const haveOffensiveWords = require('../src/js/validator');


commentsRouter.post('/', async (req, res) => {
  const comment = req.body;
  const { content, userID, postID } = comment;
  comment.date = new Date();

  const offensiveWords = await repository.offensiveWords.getAllWords();
  const notAllowedWords = haveOffensiveWords(content, offensiveWords);

  if (!content && !postID && !userID) {
    res.sendStatus(400);
  } else if (notAllowedWords.length !== 0) {
    const errorText = 'Tu comentario no puede contener palabras ofensivas';
    notAllowedWords.unshift(errorText);
    res.status(400).send(notAllowedWords);
  } else {
    await repository.comments.addComment(comment);
    res.json(comment);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await repository.comments.deleteComment(id);
  if (!comment) {
    res.sendStatus(404);
  } else {
    res.json(comment);
  }
});

commentsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await repository.comments.findComment(id);

  if (!comment) {
    res.sendStatus(404);
  } else {
    const commentReq = req.body;
    const { content, userID, postID } = commentReq;
    commentReq.date = new Date();

    if (!postID && !content && !userID) {
      res.sendStatus(400);
    } else {
      await repository.comments.updateComment(id, commentReq);
      res.json(commentReq);
    }
  }
});

module.exports = commentsRouter;
