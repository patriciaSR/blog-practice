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

  // Validation
  if (!content && !postID && !userID) {
    res.sendStatus(400);
  } else if (notAllowedWords.length !== 0) {
    const errorText = 'Tu comentario no puede contener palabras ofensivas';

    res.status(400).send(notAllowedWords);
    return errorText;
  } else {
    // Create object with needed fields and assign id
    await repository.comments.addComment(comment);
    // Return new resource
    res.json(comment);
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await repository.comments.deleteCommentById(id);
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

    // Validation
    if (!postID && !content && !userID) {
      res.sendStatus(400);
    } else {
      await repository.comments.updateComment(id, commentReq);
      // Return new resource
      res.json(commentReq);
    }
  }
});

module.exports = commentsRouter;
