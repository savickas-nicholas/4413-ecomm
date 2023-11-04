let { describe, it, expect } = global;

import * as db from '../../config/testing/testDb';

import Review from './review.model';
import ReviewFactory from './review.factory';

import User from '../user/user.model';
import UserFactory from '../user/user.factory';

import Vehicle from '../vehicle/vehicle.model';
import VehicleFactory from '../vehicle/vehicle.factory';


describe('Review Model', function() {
    let error;
    
    let mockReview;
    let mockUser;
    let mockVehicle;
    
    beforeAll(async () => {
        await db.connect();
        await db.clearDatabase();

        mockUser = new User(UserFactory.build());
        mockVehicle = new Vehicle(VehicleFactory.build());
    });
  
    beforeEach(async () => {
        mockReview = new Review(ReviewFactory.build());
        error = null;
    });
  
    afterEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.closeDatabase();
    });

    // test cases

    it('should begin with no reviews', async () => {
        let reviews = await Review.find({});
        expect(reviews.length).toEqual(0);
    });
    
    it('should create a valid review', async () => {
        mockReview.vehicle = mockVehicle._id;
        mockReview.author = mockUser._id;

        let review = await Review.create(mockReview);
        expect(review).toBeTruthy();
    });
    
    it('should fail to create a review if no author is provided', async () => {
        mockReview.vehicle = mockVehicle._id;

        try {
            let review = await Review.create(mockReview);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
    
    it('should fail to create a review if no vehicle is provided', async () => {
        mockReview.author = mockUser._id;

        try {
            let review = await Review.create(mockReview);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
    
    it('should fail to create a review with invalid rating', async () => {
        mockReview.rating = 11;

        try {
            let review = await Review.create(mockReview);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
})