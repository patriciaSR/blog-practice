const express = require('express');

const commentsRouter = express.Router({ mergeParams: true });

const repository = require('../repository/');

const haveOffensiveWords = require('../src/utils/validator');


commentsRouter.post('/', async (req, res) => {
  const comment = req.body;
  const { content, userID } = comment;
  comment.postID = req.params.id;
  comment.date = new Date();

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
    const { content, userID } = commentReq;
    commentReq.date = new Date();

    if (!content && !userID) {
      res.sendStatus(400);
    } else {
      await repository.comments.updateComment(id, commentReq);
      res.json(commentReq);
    }
  }
});

module.exports = commentsRouter;
