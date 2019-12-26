const haveOffensiveWords = require('../src/js/validator');

describe('haveOffensiveWords method test', () => {
  const mockWords = [{
    word: 'caca',
    level: 1,
  },
  {
    word: 'pedo',
    level: 1,
  },
  ];

  test('add comment without offensive words', () => {
    const mockGoodText = 'hola que tal';
    const result = haveOffensiveWords(mockGoodText, mockWords);
    expect(result.length).toEqual(0);
  });

  test('not add cooment with offensive words', () => {
    const mockBadText = 'caca que tal';
    const result = haveOffensiveWords(mockBadText, mockWords);
    expect(result.length).toEqual(1);
  });
});
