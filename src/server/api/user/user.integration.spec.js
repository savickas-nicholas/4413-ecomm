
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';
import { signToken } from '../../auth/auth.service';

import User from './user.model';
import UserFactory from './user.factory';


describe('GET /api/users', function() {
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // test cases

  it('should respond with empty JSON array', async () => {
    const res = await request(app).get('/api/users/');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.users).toBeInstanceOf(Array);
    expect(res.body.users.length).toBe(0);
  });

  it('should respond with JSON array of length 2', async () => {
    // add 2 Users
    await User.create(UserFactory.build())
    await User.create(UserFactory.build())

    const res = await request(app).get('/api/users/');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.users).toBeInstanceOf(Array);
    expect(res.body.users.length).toBe(2);
  });
});

describe('GET /api/users/:id', function() {
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // test cases

  it('should respond with user object', async () => {
    let user = await User.create(UserFactory.build());

    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.user._id).toBe(user._id.toString());
  });
});

describe('POST /api/users', function() {
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // test cases

  it('should create a User', async () => {
    let count = await User.count({});

    const res = await request(app)
                        .post('/api/users/')
                        .send({
                          name: 'user', 
                          email: 'user@example.com', 
                          password: 'user1'
                        });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeTruthy();
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.role).toBe('user');

    let newCount = await User.count({});
    expect(newCount).toBe(count + 1);
  });
});

describe('DELETE /api/users/:id', function() {
  let authenticatedAdmin;
  let token;

  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => {
    let mock = new User(UserFactory.build());
    mock.role = 'admin';
    authenticatedAdmin = await User.create(mock);
    token = signToken(authenticatedAdmin._id);
  });
  afterEach(async () => {
      await db.clearDatabase()
  });
  afterAll(async () => {
      await db.closeDatabase()
  });

  // test cases

  it('should respond with 204', async () => {
    let user = await User.create(UserFactory.build());
    let count = await User.count({});

    const res = await request(app)
                        .delete(`/api/users/${user._id}`)
                        .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);

    let newCount = await User.count({});
    expect(newCount).toBe(count - 1);
  });
});


