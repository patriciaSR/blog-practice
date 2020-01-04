const mongoose = require('mongoose');

module.exports = class OffensiveWords {
  constructor(connection, offensiveSchema) {
    this.connection = connection;
    this.collection = mongoose.model('offensiveWords', offensiveSchema, 'offensiveWords');
  }

  addWord(newWord) {
    const { word, level } = newWord;
    const newWordToAdd = {
      word,
      level,
    };
    // Save resource
    const wordMongoose = new this.collection(newWordToAdd);
    return wordMongoose.save();
  }

  addDefaultWords(defaultWords) {
    // Save resource
    return this.collection.insertMany(defaultWords);
  }

  getAllWords() {
    return this.collection.find().exec();
  }

  findWord(wordName) {
    return this.collection.find({ word: wordName }).exec();
  }

  updateWord(wordName, newWord) {
    const { word, level } = newWord;

    const newWordtoAdd = {
      word,
      level,
    };

    // Create object with needed fields and assign wordName
    return this.collection.updateOne({ word: wordName }, { $set: newWordtoAdd });
  }

  deleteWordById(wordName) {
    return this.collection.deleteOne({ word: wordName });
  }
};
