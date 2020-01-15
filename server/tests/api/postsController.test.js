jest.mock('../../utils/onlyUsers');

const onlyUsers = require('../../utils/onlyUsers');
const { mockedPosts, mockResponse, mockedComments, mockedUsers } = require('../fixtures/fixVariables');

const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');

const request = supertest(app);


describe('posts controller', () => {
  let connection;
  let db;
  let token;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    await repository.connect(connection);
    await repository.checkDefault();

    const response = await request
      .post('/login')
      .auth('dumbo555', 'dumbo22');
    // .set('Authorization', 'Basic ZHVtYm81NTU6ZHVtYm8yMg==');
    token = response.body.token;
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  test('send new post to DB', async () => {
    const response = await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + token)
      .send(mockedPosts[0])
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBe(mockedPosts[0]._id);
    expect(response.body.content).toBe(mockedPosts[0].content);
    expect(response.body.date).toBeTruthy();
    expect(response.body.userID).toBeTruthy();
  });

  test('accept the request and return all posts on DB', async () => {
    await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + token)
      .send(mockedPosts[1]);

    const response = await request.get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[1]._id).toBeTruthy();
    expect(response.body[1].title).toBe(mockedPosts[1].title);
  });

  test('accept the request and return the selected post and comments on DB', async () => {
    jest.spyOn(onlyUsers, 'getOnlyUsersIDs').mockImplementation(() => { });
    jest.spyOn(onlyUsers, 'getUserPostInfo').mockImplementation(() => mockedUsers);
    jest.spyOn(onlyUsers, 'getUserCommentsInfo').mockImplementation(() => mockedComments);

    jest.spyOn(repository.posts, 'getPost').mockImplementation(() => mockResponse);
    jest.spyOn(repository.comments, 'getCommentsPost').mockImplementation(() => []);
    jest.spyOn(repository.users, 'getUsers').mockImplementation(() => []);

    const response = await request.get('/posts/' + mockedPosts[0].id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBe(mockedPosts[0]._id);
    expect(response.body.content).toBe(mockedPosts[0].content);
  });
});
