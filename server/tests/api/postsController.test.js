
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');
const { mockedPosts, mockedComments, mockedUsers } = require('../fixtures/fixVariables');

jest.mock('../../utils/onlyUsers');
const onlyUsers = require('../../utils/onlyUsers');

const request = supertest(app);

describe('posts controller', () => {
  let connection;
  let db;

  let tokenAdmin;
  let tokenPub;

  let mockPostID;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    await repository.connect(connection);
    await repository.checkDefault();

    // login Admin
    const responseAdmin = await request
      .post('/login')
      .auth('dumbo555', 'dumbo22');
    tokenAdmin = responseAdmin.body.token;

    // login Publisher
    const responsePub = await request
      .post('/login')
      .auth('bambi555', 'bambi22');
    tokenPub = responsePub.body.token;
  });

  afterAll(async () => {
    await db.posts.remove();
    await connection.close();
    await db.close();
  });

  test('send new post to DB', async () => {
    const response = await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(mockedPosts[0])
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBeTruthy();
    expect(response.body.content).toBe(mockedPosts[0].content);
    expect(response.body.date).toBeTruthy();
    expect(response.body.userID).toBeTruthy();
  });

  test('reject request new post if you are not authenticated', async () => {
    const response = await request.post('/posts')
      .set('Accept', 'application/json')
      .send(mockedPosts[0])
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('accept the request GET ALL posts and return them from DB', async () => {
    await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(mockedPosts[1]);

    const response = await request.get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    mockPostID = response.body[0]._id;

    expect(response.body.length).toBe(2);
    expect(response.body[1]._id).toBeTruthy();
    expect(response.body[1].title).toBe(mockedPosts[1].title);
  });

  test('accept the request GET POST by id and return the selected post and comments from DB', async () => {
    onlyUsers.getOnlyUsersIDs.mockImplementation(() => []);
    onlyUsers.getUserPostInfo.mockImplementation(() => mockedUsers[0]);
    onlyUsers.getUserCommentsInfo.mockImplementation(() => mockedComments);

    const response = await request.get('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBe(mockPostID);
    expect(response.body.content).toBe(mockedPosts[0].content);
    expect(response.body.userInfo).toEqual(mockedUsers[0]);
    expect(response.body.comments).toEqual(mockedComments);
  });

  test('reject the request GET POST by id and return "not found" with false postID', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.get('/posts/' + falseId)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('accept the request PUT POST by id and return the new post edited', async () => {
    const changePost = { ...mockedPosts[0] };
    changePost.title = 'chaaangePost';

    const response = await request.put('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(changePost)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.title).toBe(changePost.title);
    expect(response.body.date).toBeTruthy();
  });

  test('reject the request PUT POST by false id and return not found post', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.put('/posts/' + falseId)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('reject the request PUT POST if you no have correct role', async () => {
    const response = await request.put('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(403);

    expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  });

  test('reject the request DELETE POST by false id and return not found post', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.put('/posts/' + falseId)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('reject the request DELETE POST if you no have correct role', async () => {
    const response = await request.put('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(403);

    expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  });

  test('accept the request DELETE POST by id and returns correct delete json', async () => {
    const response = await request.delete('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.deletedCount).toBe(1);
    expect(response.body.comments.deletedCount).toBe(0);
  });
});
