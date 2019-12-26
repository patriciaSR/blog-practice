const express = require('express');

const offensiveRouter = express.Router();

const repository = require('../repository/');


offensiveRouter.post('/', async (req, res) => {
  const newWord = req.body;
  const { word, level } = newWord;

  // Validation
  if (!(word && level)) {
    res.sendStatus(400);
  } else {
    // Create object with needed fields and assign id
    await repository.offensiveWords.addWord(newWord);
    // Return new resource
    res.json(newWord);
  }
});

offensiveRouter.get('/', async (req, res) => {
  const allWords = await repository.offensiveWords.getAllWords();
  res.json(allWords);
});

offensiveRouter.delete('/:wordName', async (req, res) => {
  const wordName = req.params.wordName;
  const word = await repository.offensiveWords.deleteWordById(wordName);
  if (!word) {
    res.sendStatus(404);
  } else {
    res.json(word);
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

    // Validation
    if (!(word && level)) {
      res.sendStatus(400);
    } else {
      await repository.offensiveWords.updateWord(wordName, wordReq);
      // Return new resource
      res.json(wordReq);
    }
  }
});

module.exports = offensiveRouter;
