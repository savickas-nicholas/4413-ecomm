
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';

describe('GET /api/orders', function() {
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
    const res = await request(app).get('/api/orders');
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(200);
    expect(res.body.orders).toBeInstanceOf(Array);
  });



  
});



