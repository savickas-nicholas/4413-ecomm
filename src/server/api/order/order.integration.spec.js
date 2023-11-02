
let { describe, it, expect } = global;

import app from '../../app';
import request from 'supertest';

// WORKING
describe('GET /api/orders', function() {
  it('should respond with JSON array', async (done) => {
    request(app)
      .get('/api/orders')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.orders).toBeInstanceOf(Array);
        done();
      });
  });
});



