
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';
import { signToken } from '../../auth/auth.service';

import Review from './review.model';
import ReviewFactory from './review.factory';

import User from '../user/user.model';
import UserFactory from '../user/user.factory';

import Vehicle from '../vehicle/vehicle.model';
import VehicleFactory from '../vehicle/vehicle.factory';


describe('GET /api/reviews', function() {
  let author;
  let vehicle;
  let vehicle2;
  
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    author = await User.create(UserFactory.build());
    vehicle = await Vehicle.create(VehicleFactory.build());
    vehicle2 = await Vehicle.create(VehicleFactory.build());
  });
  afterEach(async () => {
      await db.clearDatabase();
  });
  afterAll(async () => {
      await db.closeDatabase();
  });

  // test cases

  it('should respond with JSON array', async () => {
    const res = await request(app).get('/api/reviews/');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.reviews).toBeInstanceOf(Array);
    expect(res.body.reviews.length).toBe(0);
  });

  it('should respond with all reviews', async () => {
    // add 2 Reviews
    let review1 = ReviewFactory.build();
    review1.author = author._id;
    review1.vehicle = vehicle._id;

    let review2 = new Review(ReviewFactory.build());
    review2.author = author._id;
    review2.vehicle = vehicle2._id;

    await Review.create(review1);
    await Review.create(review2);

    const res = await request(app).get('/api/reviews/');
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.reviews).toBeInstanceOf(Array);
    expect(res.body.reviews.length).toBe(2);
  });

  // add filter by vehicle
  it('should respond with reviews for specific vehicle', async () => {
    // add 2 Reviews
    let review1 = ReviewFactory.build();
    review1.author = author._id;
    review1.vehicle = vehicle._id;

    let review2 = new Review(ReviewFactory.build());
    review2.author = author._id;
    review2.vehicle = vehicle2._id;

    review1 = await Review.create(review1);
    review2 = await Review.create(review2);

    const res = await request(app).get(`/api/reviews/?vehicle=${vehicle2._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.reviews).toBeInstanceOf(Array);
    expect(res.body.reviews.length).toBe(1);
  });
});


describe('GET /api/reviews/:id', function() {
  let author;
  let vehicle;
  
  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    author = await User.create(UserFactory.build());
    vehicle = await Vehicle.create(VehicleFactory.build());
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // test cases

  it('should respond with specific review', async () => {
    let review = ReviewFactory.build({
      author: author._id,
      vehicle: vehicle._id,
    });

    review = await Review.create(review);

    const res = await request(app).get(`/api/reviews/${review._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.review._id).toBe(review._id.toString());
  });
});


describe('POST /api/reviews', function() {
  let author;
  let vehicle;
  let authorToken;

  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    vehicle = await Vehicle.create(VehicleFactory.build());
    author = await User.create(UserFactory.build());
    authorToken = signToken(author._id);
  });
  afterEach(async () => {
      await db.clearDatabase();
  });
  afterAll(async () => {
      await db.closeDatabase()
  });

  it('should respond with 201 if successful', async () => {
    let count = await Review.count({});
    const res = await request(app).post('/api/reviews/')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({
        title: 'test', 
        summary: 'test_summary', 
        rating: 5,
        author: author._id,
        vehicle: vehicle._id
      });
  
    expect(res.type).toBe('application/json');
    expect(res.status).toBe(201);
    let newCount = await Review.count({});
    expect(newCount).toBe(count + 1);
  });

  it('should respond with 401 if not logged in', async () => {
    const res = await request(app).post('/api/reviews/')
      .send({
        title: 'test', 
        summary: 'test_summary', 
        rating: 5,
        author: author._id,
        vehicle: vehicle._id
      });
  
    expect(res.status).toBe(401);
  });

  it('should respond with 404 if mandatory field is missing', async () => {
    let count = await Review.count({});
    const res = await request(app).post('/api/reviews/')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({
        summary: 'test_summary', 
        rating: 5,
        author: author._id,
        vehicle: vehicle._id
      });
  
    expect(res.status).toBe(404);
    let newCount = await Review.count({});
    expect(newCount).toBe(count);
  });

  it('should respond with 404 validation error if authorId does not exist', async () => {
    let count = await Review.count({});
    const res = await request(app).post('/api/reviews/')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({
        summary: 'test_summary', 
        rating: 5,
        author: 324874982734,
        vehicle: vehicle._id
      });
  
    expect(res.status).toBe(404);
    let newCount = await Review.count({});
    expect(newCount).toBe(count);
  });

  it('should respond with 404 validation error if productId does not exist', async () => {
    let count = await Review.count({});
    const res = await request(app).post('/api/reviews/')
      .set('Authorization', `Bearer ${authorToken}`)
      .send({
        summary: 'test_summary', 
        rating: 5,
        author: author._id,
        vehicle: 348237489234
      });
  
    expect(res.status).toBe(404);
    let newCount = await Review.count({});
    expect(newCount).toBe(count);
  });
});



describe('DELETE /api/reviews/:id', function() {
  let author;
  let vehicle;
  let authorToken;
  let admin;
  let adminToken;

  beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
  });
  beforeEach(async () => {
    vehicle = await Vehicle.create(VehicleFactory.build());
    author = await User.create(UserFactory.build());
    authorToken = signToken(author._id);
    admin = await User.create(UserFactory.build({ role: 'admin' }));
    adminToken = signToken(admin._id);
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  // test cases

  it('should respond with 204 if deleted by admin', async () => {
    let review = await Review.create(ReviewFactory.build({
      author: author._id,
      vehicle: vehicle._id,
    }));
    let count = await Review.count({});

    const res = await request(app)
                        .delete(`/api/reviews/${review._id}`)
                        .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(204);

    let newCount = await Review.count({});
    expect(newCount).toBe(count - 1);
  });

  it('should respond with 204 if deleted by author', async () => {
    let review = await Review.create(ReviewFactory.build({
      author: author._id,
      vehicle: vehicle._id,
    }));
    let count = await Review.count({});

    const res = await request(app)
                        .delete(`/api/reviews/${review._id}`)
                        .set('Authorization', `Bearer ${authorToken}`);

    expect(res.statusCode).toBe(204);

    let newCount = await Review.count({});
    expect(newCount).toBe(count - 1);
  });
});