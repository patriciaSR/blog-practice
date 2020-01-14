const { getOnlyUsersIDs, getUserPostInfo, getUserCommentsInfo } = require('../src/utils/onlyUsers');

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
  _id: '1a',
  firstname: 'lola',
  username: 'lola22',
},
{
  _id: '2a',
  firstname: 'paco',
  username: 'paco22',
},
{
  _id: '3a',
  firstname: 'marta',
  username: 'marta22',
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
      _id: '3a',
      firstname: 'marta',
      username: 'marta22',
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
        userID: '1a',
        username: 'lola22',
      },
    },
    {
      _id: '2',
      userID: '1a',
      userInfo: {
        userID: '1a',
        username: 'lola22',
      },
    },
    {
      _id: '2',
      userID: '2a',
      userInfo: {
        userID: '2a',
        username: 'paco22',
      },
    }];

    const result = getUserCommentsInfo(mockComments, mockUsersInfo);

    expect(result).toEqual(expectedResult);
  });
});
