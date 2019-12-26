
function haveOffensiveWords(text, offensiveWords) {
  let notAllowedOffensiveWords = [];

  offensiveWords.forEach((word) => {
    const isWordIncluded = text.includes(word.word);

    if (isWordIncluded) {
      notAllowedOffensiveWords.push(word);
    }
  });

  return notAllowedOffensiveWords;
}

module.exports = haveOffensiveWords;
