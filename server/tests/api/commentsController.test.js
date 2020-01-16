
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');
const { mockedPosts, mockedComments, mockedUsers } = require('../fixtures/fixVariables');

// jest.mock('../../utils/onlyUsers');
// const onlyUsers = require('../../utils/onlyUsers');

const request = supertest(app);

describe('posts controller', () => {
  let connection;
  let db;

  let tokenAdmin;
  let tokenPub;

  let mockPostID;
  let mockCommentID;

  const newComent = 'hola que tal';
  const offensiveComment = 'caca culo pedo pis';


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
    // .set('Authorization', 'Basic ZHVtYm81NTU6ZHVtYm8yMg==');
    tokenAdmin = responseAdmin.body.token;

    // login Publisher
    const responsePub = await request
      .post('/login')
      .auth('bambi555', 'bambi22');
    // .set('Authorization', 'Basic ZHVtYm81NTU6ZHVtYm8yMg==');
    tokenPub = responsePub.body.token;

    //new post
    const responsePost = await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(mockedPosts[0]);
    mockPostID = responsePost.body._id;
  });

  afterAll(async () => {
    await db.posts.remove();
    await connection.close();
    await db.close();
  });

  test('accept request and send new COMMENT POST on DB', async () => {
    const response = await request.post('/posts/' + mockPostID + '/comments')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send({ content: newComent })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBeTruthy();
    expect(response.body.date).toBeTruthy();
    expect(response.body.userID).toBeTruthy();
    expect(response.body.postID).toBe(mockPostID);
    expect(response.body.content).toBe(newComent);
  });

  test('reject request new COMMENT POST if you are not authenticated', async () => {
    const response = await request.post('/posts/' + mockPostID + '/comments')
      .set('Accept', 'application/json')
      .send({ content: newComent })
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('reject request new COMMENT POST if comments has offensive words', async () => {
    const expectedWord = await repository.offensiveWords.findWord('caca');
    const response = await request.post('/posts/' + mockPostID + '/comments')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send({ content: 'caca' })
      .expect('Content-Type', /json/)
      .expect(403);

    expect(response.body.errorText).toBe('Tu comentario no puede contener palabras ofensivas');
    expect(response.body.notAllowedWords[0].word).toBe(expectedWord.word);
    expect(response.body.notAllowedWords[0].level).toBe(expectedWord.level);
  });


  //   test('accept the request PUT POST by id and return the new post edited', async () => {
  //     const changePost = { ...mockedPosts[0] };
  //     changePost.title = 'chaaangePost';

  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .send(changePost)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body.title).toBe(changePost.title);
  //     expect(response.body.date).toBeTruthy();
  //   });

  //   test('reject the request PUT POST by false id and return not found post', async () => {
  //     const falseId = '5e1dec18ddd15a6923ab68cf';

  //     const response = await request.put('/posts/' + falseId)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect(404);

  //     expect(response.text).toBe('Not Found');
  //   });

  //   test('reject the request PUT POST if you no have correct role', async () => {
  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenPub)
  //       .expect('Content-Type', 'text/html; charset=utf-8')
  //       .expect(403);

  //     expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  //   });

  //   test('reject the request DELETE POST by false id and return not found post', async () => {
  //     const falseId = '5e1dec18ddd15a6923ab68cf';

  //     const response = await request.put('/posts/' + falseId)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect(404);

  //     expect(response.text).toBe('Not Found');
  //   });

  //   test('reject the request DELETE POST if you no have correct role', async () => {
  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenPub)
  //       .expect('Content-Type', 'text/html; charset=utf-8')
  //       .expect(403);

  //     expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  //   });

  //   test('accept the request DELETE POST by id and returns correct delete json', async () => {
  //     const response = await request.delete('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body.deletedCount).toBe(1);
  //     expect(response.body.comments.deletedCount).toBe(0);
  //   });
  // });test('accept the request GET ALL posts and return them from DB', async () => {
  //     await request.post('/posts')
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .send(mockedPosts[1]);

  //     const response = await request.get('/posts')
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     mockPostID = response.body[0]._id;

  //     expect(response.body.length).toBe(2);
  //     expect(response.body[1]._id).toBeTruthy();
  //     expect(response.body[1].title).toBe(mockedPosts[1].title);
  //   });

  //   test('accept the request GET POST by id and return the selected post and comments from DB', async () => {
  //     onlyUsers.getOnlyUsersIDs.mockImplementation(() => []);
  //     onlyUsers.getUserPostInfo.mockImplementation(() => mockedUsers[0]);
  //     onlyUsers.getUserCommentsInfo.mockImplementation(() => mockedComments);

  //     const response = await request.get('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body._id).toBe(mockPostID);
  //     expect(response.body.content).toBe(mockedPosts[0].content);
  //     expect(response.body.userInfo).toEqual(mockedUsers[0]);
  //     expect(response.body.comments).toEqual(mockedComments);
  //   });

  //   test('reject the request GET POST by id and return "not found" with false postID', async () => {
  //     const falseId = '5e1dec18ddd15a6923ab68cf';

  //     const response = await request.get('/posts/' + falseId)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect(404);

  //     expect(response.text).toBe('Not Found');
  //   });

  //   test('accept the request PUT POST by id and return the new post edited', async () => {
  //     const changePost = { ...mockedPosts[0] };
  //     changePost.title = 'chaaangePost';

  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .send(changePost)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body.title).toBe(changePost.title);
  //     expect(response.body.date).toBeTruthy();
  //   });

  //   test('reject the request PUT POST by false id and return not found post', async () => {
  //     const falseId = '5e1dec18ddd15a6923ab68cf';

  //     const response = await request.put('/posts/' + falseId)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect(404);

  //     expect(response.text).toBe('Not Found');
  //   });

  //   test('reject the request PUT POST if you no have correct role', async () => {
  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenPub)
  //       .expect('Content-Type', 'text/html; charset=utf-8')
  //       .expect(403);

  //     expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  //   });

  //   test('reject the request DELETE POST by false id and return not found post', async () => {
  //     const falseId = '5e1dec18ddd15a6923ab68cf';

  //     const response = await request.put('/posts/' + falseId)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect(404);

  //     expect(response.text).toBe('Not Found');
  //   });

  //   test('reject the request DELETE POST if you no have correct role', async () => {
  //     const response = await request.put('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenPub)
  //       .expect('Content-Type', 'text/html; charset=utf-8')
  //       .expect(403);

  //     expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  //   });

  //   test('accept the request DELETE POST by id and returns correct delete json', async () => {
  //     const response = await request.delete('/posts/' + mockPostID)
  //       .set('Accept', 'application/json')
  //       .set('Authorization', 'bearer ' + tokenAdmin)
  //       .expect('Content-Type', /json/)
  //       .expect(200);

  //     expect(response.body.deletedCount).toBe(1);
  //     expect(response.body.comments.deletedCount).toBe(0);
  //   });
});

