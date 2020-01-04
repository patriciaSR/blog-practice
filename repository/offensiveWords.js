module.exports = class OffensiveWords {
  constructor(connection) {
    this.connection = connection;
  }

  addWord(newWord) {
    const { word, level } = newWord;
    // Save resource
    return this.connection.execute(
      'INSERT INTO offensiveWords SET word = ?, level = ?',
      [word, level],
    );
  }

  addDefaultWords(defaultWords) {
    // Save resource
    return this.connection.execute(
      'INSERT INTO offensiveWords SET word = ?, level = ?',
      defaultWords,
    );
  }

  getAllWords() {
    return this.connection.execute('SELECT * FROM offensiveWords');
  }

  findWord(wordName) {
    return this.connection.execute(
      'SELECT * FROM offensiveWords WHERE word = ?',
      [wordName],
    );
  }

  updateWord(wordName, newWord) {
    const { word, level } = newWord;

    const newWordtoAdd = {
      word,
      level,
    };

    // Create object with needed fields and assign wordName
    return this.connection.execute(
      'UPDATE offensiveWords SET word = ? level = ? WHERE word = ?',
      [word, level, wordName],
    );
  }

  deleteWordById(wordName) {
    return this.connection.execute('DELETE FROM offensiveWords WHERE word = ?', [wordName]);
  }
};
