const getOnlyUserIDsArray = require('../src/js/onlyUsers');

describe('getOnlyUserIDsArray method test', () => {
  const mockPost = [{
    _id: '3',
    userID: '3a',
  },
  ];

  const mockComments = [{
    _id: '2',
    userID: '1a',
  },
  {
    _id: '2',
    userID: '1a',
  },
  {
    _id: '2',
    userID: '2a',
  },
  ];

  test('get onlyUserIDs into an Array', () => {
    const expectedResult = ['3a', '1a', '2a'];

    const result = getOnlyUserIDsArray(mockPost, mockComments);

    expect(result.length).toEqual(3);
    expect(result).toEqual(expectedResult);
  });

  test('get onlyUserIDs into an Array without repeated ids', () => {
    const mockRepeatUserIDPost = [{
      _id: '3',
      userID: '1a',
    },
    ];
    const expectedResult = ['1a', '2a'];

    const result = getOnlyUserIDsArray(mockRepeatUserIDPost, mockComments);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });
});
