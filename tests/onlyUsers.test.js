const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../src/js/onlyUsers');

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

const mockUsersInfo = [{
  _id: '2',
  userID: '1a',
  firstname: 'lola',
},
{
  _id: '2',
  userID: '2a',
  firstname: 'paco',
},
{
  _id: '2',
  userID: '3a',
  firstname: 'marta',
},
];

describe('getOnlyUserIDs method test', () => {
  const mockPost = {
    _id: '3',
    userID: '3a',
  };

  test('get onlyUserIDs into an Array', () => {
    const expectedResult = ['3a', '1a', '2a'];

    const result = getOnlyUsersIDs(mockPost, mockComments);

    expect(result.length).toEqual(3);
    expect(result).toEqual(expectedResult);
  });

  test('get onlyUserIDs into an Array without repeated ids', () => {
    const mockRepeatUserIDPost = {
      _id: '3',
      userID: '1a',
    };
    const expectedResult = ['1a', '2a'];

    const result = getOnlyUsersIDs(mockRepeatUserIDPost, mockComments);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });
});


describe('getUserPostInfo method test', () => {
  const mockUserID = '3a';

  test('get userPostInfo from userPostID and onlyUsersInfo Array', () => {
    const expectedResult = {
      _id: '2',
      userID: '3a',
      firstname: 'marta',
    };

    const result = getUserPostInfo(mockUserID, mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });

  test('return undefined userPostInfo when userPostID is not in onlyUsersInfo Array', () => {
    const expectedResult = undefined;

    const result = getUserPostInfo('45b', mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });
});


describe('getUserCommentsInfo method test', () => {
  test('get getUserCommentsInfo from userPostID and onlyUsersInfo Array', () => {
    const expectedResult = [{
      _id: '2',
      userID: '1a',
      userInfo: {
        _id: '2',
        firstname: 'lola',
        userID: '1a',
      },
    },
    {
      _id: '2',
      userID: '1a',
      userInfo: {
        _id: '2',
        firstname: 'lola',
        userID: '1a',
      },
    },
    {
      _id: '2',
      userID: '2a',
      userInfo: {
        _id: '2',
        firstname: 'paco',
        userID: '2a',
      },
    }];

    const result = getUserCommentsInfo(mockComments, mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });
});
