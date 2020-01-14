const express = require('express');

const offensiveRouter = express.Router();

const repository = require('../repository/');

offensiveRouter.post('/', async (req, res) => {
  const newWord = req.body;
  newWord.word = newWord.word.toLowerCase();
  const { word, level } = newWord;

  const isWordIncluded = await repository.offensiveWords.findWord(word);

  if (!word && !level) {
    res.sendStatus(400);
  } else if (isWordIncluded) {
    res.status(400).send('Esa palabra ya existe en la base de datos');
  } else {
    await repository.offensiveWords.addWord(newWord);
    res.status(200).json(newWord);
  }
});

offensiveRouter.get('/', async (req, res) => {
  const allWords = await repository.offensiveWords.getAllWords();
  res.status(200).json(allWords);
});

offensiveRouter.delete('/:wordName', async (req, res) => {
  const wordName = req.params.wordName;
  const word = await repository.offensiveWords.deleteWord(wordName);

  if (!word) {
    res.sendStatus(404);
  } else {
    res.status(200).json(word);
  }
});

offensiveRouter.put('/:wordName', async (req, res) => {
  const wordName = req.params.wordName;
  const findWord = await repository.offensiveWords.findWord(wordName);

  if (!findWord) {
    res.sendStatus(404);
  } else {
    const wordReq = req.body;
    const { word, level } = wordReq;

    if (!word && !level) {
      res.sendStatus(400);
    } else {
      await repository.offensiveWords.updateWord(wordName, wordReq);
      res.status(200).json(wordReq);
    }
  }
});

module.exports = offensiveRouter;
