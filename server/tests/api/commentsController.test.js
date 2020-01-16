
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');
const { mockedPosts } = require('../fixtures/fixVariables');

const request = supertest(app);

describe('comments controller', () => {
  let connection;
  let db;

  let tokenAdmin;
  let tokenPub;

  let mockPostID;
  let mockCommentID;

  const newComent = 'hola que tal';
  const offensiveComment = 'caca culo pedo pis';
  const changeComment = { content: 'hola guapa' };


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

    // new post
    const responsePost = await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(mockedPosts[0]);
    mockPostID = responsePost.body._id;

    // new comment
    const response = await request.post('/posts/' + mockPostID + '/comments')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send({ content: newComent });
    mockCommentID = response.body._id;
  });

  afterAll(async () => {
    await db.collection('posts').remove();
    await db.collection('comments').remove();
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
      .send({ content: offensiveComment })
      .expect('Content-Type', /json/)
      .expect(403);

    expect(response.body.errorText).toBe('Tu comentario no puede contener palabras ofensivas');
    expect(response.body.notAllowedWords[0].word).toBe(expectedWord.word);
    expect(response.body.notAllowedWords[0].level).toBe(expectedWord.level);
  });

  test('accept the request PUT COMMENT by id and return the new comment edited', async () => {
    const response = await request.put('/posts/' + mockPostID + '/comments/' + mockCommentID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(changeComment)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.content).toBe(changeComment.content);
    expect(response.body.date).toBeTruthy();
    expect(response.body.userID).toBeTruthy();
  });

  test('reject the request PUT COMMENT by false id and return not found comment', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.put('/posts/' + mockPostID + '/comments/' + falseId)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(changeComment)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('reject the request PUT COMMENT if you no have correct role', async () => {
    const response = await request.put('/posts/' + mockPostID + '/comments/' + mockCommentID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .send(changeComment)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(401);

    expect(response.text).toBe('No puedes modificar este comentario');
  });

  test('reject the request DELETE COMMENT by false id and return not found comment', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.delete('/posts/' + mockPostID + '/comments/' + falseId)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('reject the request DELETE COMMENT if you no have correct role', async () => {
    const response = await request.delete('/posts/' + mockPostID + '/comments/' + mockCommentID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(401);

    expect(response.text).toBe('No tienes permiso para borrar este comentario');
  });

  test('accept the request DELETE POST by id and returns correct delete json', async () => {
    const response = await request.delete('/posts/' + mockPostID + '/comments/' + mockCommentID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.deletedCount).toBe(1);
    expect(response.body.result.ok).toBe(1);
  });
});
