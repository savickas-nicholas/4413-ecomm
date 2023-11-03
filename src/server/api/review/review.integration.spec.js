
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';

import User from '../user/user.model';
import Vehicle from '../vehicle/vehicle.model';




describe('GET /api/reviews', function() {
  beforeAll(async () => {
    await db.connect()
  });
  afterEach(async () => {
      await db.clearDatabase()
  });
  afterAll(async () => {
      await db.closeDatabase()
  });

  it('should respond with JSON array', async () => {
    const res = await request(app).post('/api/orders');
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(200);
    expect(res.body.orders).toBeInstanceOf(Array);
  });
});


describe('POST /api/reviews', function() {
  beforeAll(async () => {
    await db.connect()
  });
  beforeEach(async () => {
    // create user and product



  });
  afterEach(async () => {
      await db.clearDatabase()
  });
  afterAll(async () => {
      await db.closeDatabase()
  });

  it('should respond with 201 if successful', async () => {
    const res = await request(app).post('/api/orders')
      .send({title: 'test', summary: 'test_summary', });
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(200);
    expect(res.body.orders).toBeInstanceOf(Array);
  });

  // it('should respond with 404 if mandatory field is missing', async () => {
  //   const res = await request(app).post('/api/orders');
  //   expect(res.type).toBe('application/json');
  //   expect(res.status).toBe(200);
  //   expect(res.body.orders).toBeInstanceOf(Array);
  // });

  // it('should respond with 404 validation error if authorId does not exist', async () => {
  //   const res = await request(app).post('/api/orders');
  //   expect(res.type).toBe('application/json');
  //   expect(res.status).toBe(200);
  //   expect(res.body.orders).toBeInstanceOf(Array);
  // });

  // it('should respond with 404 validation error if productId does not exist', async () => {
  //   const res = await request(app).post('/api/orders');
  //   expect(res.type).toBe('application/json');
  //   expect(res.status).toBe(200);
  //   expect(res.body.orders).toBeInstanceOf(Array);
  // });


});