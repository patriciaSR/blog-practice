
function haveOffensiveWords(text, offensiveWords) {
  const notAllowedOffensiveWords = [];

  offensiveWords.forEach((word) => {
    const isWordIncluded = text.toLowerCase().includes(word.word);

    if (isWordIncluded) {
      notAllowedOffensiveWords.push(word);
    }
  });

  return notAllowedOffensiveWords;
}

module.exports = haveOffensiveWords;
