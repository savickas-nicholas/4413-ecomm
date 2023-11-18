

let { describe, it, expect } = global;

import request from 'supertest';

import app from '../app';
import * as db from '../config/testing/testDb';
import { resetCache } from '../cache';

describe('POST /payment/validate/', function() {
  let myCache;
  
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    myCache = resetCache();
  });
  afterEach(async () => {
      await db.clearDatabase();
  });
  afterAll(async () => {
      await db.closeDatabase();
  });

  // test cases

  it('should respond with 404 if mandatory fields are missing', async () => {
    const res = await request(app)
      .post('/payment/validate/')
      .send({
        cardNumber: "hello",
      });
    expect(res.statusCode).toBe(404);
  });

  it('should respond with 200 for the first two payment requests and 404 for the third payment request and 200 again for the fourth', async () => {
    let res = await request(app)
      .post('/payment/validate/')
      .send({
        cardNumber: "hello",
        nameOnCard: "test",
        authCode: "606"
      });
    expect(res.statusCode).toBe(200);
    
    res = await request(app)
      .post('/payment/validate/')
      .send({
        cardNumber: "hello",
        nameOnCard: "test",
        authCode: "606"
      });
    expect(res.statusCode).toBe(200);

    res = await request(app)
      .post('/payment/validate/')
      .send({
        cardNumber: "hello",
        nameOnCard: "test",
        authCode: "606"
      });
    expect(res.statusCode).toBe(404);

    res = await request(app)
      .post('/payment/validate/')
      .send({
        cardNumber: "hello",
        nameOnCard: "test",
        authCode: "606"
      });
    expect(res.statusCode).toBe(200);
  });
});

