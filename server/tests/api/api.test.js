
const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');
const { mockedPosts, mockedComments, mockedUsers } = require('../fixtures/fixVariables');

jest.mock('../../utils/onlyUsers');
const onlyUsers = require('../../utils/onlyUsers');

const request = supertest(app);


describe('auth controller', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    await repository.connect(connection);
    await repository.checkDefault();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  test('reject the request if the auth header is not send', async () => {
    const response = await request.post('/login').expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('accept the request if auth header is send', async () => {
    const response = await request.post('/login')
      .auth('dumbo555', 'dumbo22')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe('Auth Passed');
    expect(typeof response.body.token).toBe('string');
  });
});


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
    await connection.close();
    await db.close();
  });

  beforeEach(async (done) => {
    const response = await request.post('/posts')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(mockedPosts[1]);
    mockPostID = response.body._id;
    done();
  });

  afterEach(async (done) => {
    await repository.posts.deleteAllPost();
    done();
  });

  test('accept the request GET ALL posts and return them from DB', async () => {
    const response = await request.get('/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBeTruthy();
    expect(response.body[0].title).toBe(mockedPosts[1].title);
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
      .expect(401);

    expect(response.text).toBe('No puedes modificar un post que no es tuyo');
  });

  test('reject the request DELETE POST by false id and return not found post', async () => {
    const falseId = '5e1dec18ddd15a6923ab68cf';

    const response = await request.delete('/posts/' + falseId)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404);

    expect(response.text).toBe('Not Found');
  });

  test('reject the request DELETE POST if you no have correct role', async () => {
    const response = await request.delete('/posts/' + mockPostID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(401);

    expect(response.text).toBe('No puedes borrar un post que no es tuyo');
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
  });


  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    // add new post
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

  afterEach(async () => {
    await repository.posts.deleteAllPost();
    await repository.comments.deleteComment(mockCommentID);
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

  test('accept the request DELETE COMMENT by id and returns correct delete json', async () => {
    const response = await request.delete('/posts/' + mockPostID + '/comments/' + mockCommentID)
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.deletedCount).toBe(1);
    expect(response.body.result.ok).toBe(1);
  });
});


describe('offensiveWords controller', () => {
  let connection;
  let db;

  let tokenAdmin;
  let tokenPub;

  const newWord = { word: 'feo', level: 1 };
  const ChangeWord = { word: 'tonto', level: 1 };

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

  beforeEach(async () => {
    await repository.checkDefault();
  });

  afterEach(async () => {
    await db.collection('offensiveWords').deleteMany();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  test('reject request new WORD POST if you are not authenticated', async () => {
    const response = await request.post('/offensive-words')
      .set('Accept', 'application/json')
      .send(newWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('reject request new WORD POST if you not have admin role', async () => {
    const response = await request.post('/offensive-words')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .send(newWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('send new WORD POST to DB', async () => {
    const response = await request.post('/offensive-words')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(newWord)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBeTruthy();
    expect(response.body.word).toBe(newWord.word);
    expect(response.body.level).toBe(newWord.level);
  });

  test('reject request  GET ALL WORDS if you are not authenticated', async () => {
    const response = await request.get('/offensive-words')
      .set('Accept', 'application/json')
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('reject request GET ALL WORDS if you not have admin role', async () => {
    const response = await request.get('/offensive-words')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .send(newWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('accept the request GET ALL WORDS and return them from DB', async () => {
    const response = await request.get('/offensive-words')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(4);
    expect(response.body[0].word).toBe('caca');
    expect(response.body[0].level).toBe(1);
  });

  test('reject request PUT WORD by word name if you are not authenticated', async () => {
    const response = await request.put('/offensive-words/caca')
      .set('Accept', 'application/json')
      .send(ChangeWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('reject request PUT WORD by word name if you not have admin role', async () => {
    const response = await request.put('/offensive-words/caca')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .send(ChangeWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('accept the request PUT WORD by word name and return the new post edited', async () => {
    const response = await request.put('/offensive-words/caca')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .send(ChangeWord)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.word).toBe(ChangeWord.word);
    expect(response.body.level).toBe(ChangeWord.level);
  });

  test('reject the request DELETE WORD by word name if you are not authenticated', async () => {
    const response = await request.delete('/offensive-words/pedo')
      .set('Accept', 'application/json')
      .send(ChangeWord)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('reject request DELETE WORD by name if you not have admin role', async () => {
    const response = await request.put('/offensive-words/caca')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenPub)
      .expect(401);

    expect(response.text).toBe('Unauthorized');
  });

  test('accept the request DELETE WORD by name word and returns correct delete json', async () => {
    const response = await request.delete('/offensive-words/pedo')
      .set('Accept', 'application/json')
      .set('Authorization', 'bearer ' + tokenAdmin)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.deletedCount).toBe(1);
    expect(response.body.result.ok).toBe(1);
  });
});

describe('signup controller', () => {
  let connection;
  let db;

  const newUser = {
    firstname: 'mufasa',
    lastname: 'lopez',
    username: 'mufasa555',
    email: 'mufasa@gmail.com',
    image: 'kadasad',
    password: 'mufasa22',
  };

  const existUser = {
    firstname: 'bambi',
    lastname: 'lopez',
    username: 'bambi555',
    email: 'bambi@gmail.com',
    image: 'kadasad',
    password: 'bambi22',
    role: 'publisher',
  };

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);

    await repository.connect(connection);
    await repository.checkDefault();
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  test('accept the request POST NEW USER', async () => {
    const response = await request.post('/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(200);

    expect(response.body.message).toBe('Usuario registrado correctamente');
    expect(response.body.newUser.username).toBe(newUser.username);
    expect(response.body.newUser.role).toBe('publisher');
    expect(response.body.newUser.password).toBeFalsy();
    expect(response.body.newUser.passwordHash).toBeFalsy();
  });

  test('reject the request POST NEW USER if user name exist on DB', async () => {
    const existUserChangedEmail = { ...existUser };
    existUserChangedEmail.email = 'lola22@gmail.com';
    const response = await request.post('/signup')
      .set('Accept', 'application/json')
      .send(existUserChangedEmail)
      .expect(400);

    expect(response.text).toBe('Ese usuario ya existe');
  });
  test('reject the request POST NEW USER if user email exist on DB', async () => {
    const existUserChangedName = { ...existUser };
    existUserChangedName.username = 'Lola';

    const response = await request.post('/signup')
      .set('Accept', 'application/json')
      .send(existUserChangedName)
      .expect(400);

    expect(response.text).toBe('Ese usuario ya existe');
  });
});
