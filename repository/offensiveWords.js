module.exports = class OffensiveWords {
  constructor(connection) {
    this.connection = connection;
    this.collection = this.connection.db().collection('offensiveWords');
  }

  addWord(newWord) {
    const { word, level } = newWord;

    const newWordtoAdd = {
      word,
      level,
    };
    // Save resource
    return this.collection.insertOne(newWordtoAdd);
  }

  addDefaultWords(defaultWords) {
    // Save resource
    return this.collection.insertMany(defaultWords);
  }

  getAllWords() {
    return this.collection.find().toArray();
  }

  findWord(wordName) {
    return this.collection.findOne({ word: wordName });
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
