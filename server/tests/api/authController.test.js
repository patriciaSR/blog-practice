const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../server');

const repository = require('../../repository');

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
    await db.posts.remove();
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
