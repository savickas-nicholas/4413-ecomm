let { describe, it, expect } = global;

import * as db from '../../config/testing/testDb';

import User from './user.model';
import UserFactory from './user.factory';

describe('User Model', function() {
    let mockUser;
    
    beforeAll(function(done) {
        User.remove({}, () => done());
    });
  
    beforeEach(function(done) {
        mockUser = new User(UserFactory.build());
        done();
    });
  
    afterEach(function(done) {
        User.remove({}, () => done());
    });

    it('should begin with no users', function(done) {
        User.find({}, function(err, users) {
            expect(users.length).toEqual(0);
            done();
        });
    });
    
    it('should create a user', function(done) {
        User.create(mockUser, function(err, user) {
            if(err) done(err);
            expect(user).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a user with negative price', function(done) {
        mockUser.price = -1.0;
        User.create(mockUser, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a user with negative quantity', function(done) {
        mockUser.quantity = -1;
        User.create(mockUser, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a user with negative mileage', function(done) {
        mockUser.miles = -1.0;
        User.create(mockUser, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a user with wrong mileage units', function(done) {
        mockUser.milesUnits = "mm";
        User.create(mockUser, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should create user with default mileage', function(done) {
        User.create(mockUser, function(err, user) {
            if(err) done(err);
            expect(user.miles).toEqual(0);
            expect(user.milesUnits).toEqual('km');
            done();
        })
    });
    
    it('should create user with default customizations', function(done) {
        User.create(mockUser, function(err, user) {
            if(err) done(err);
            for (const customization in user.customizations) {
                expect(customization === '').toBeTruthy();
            }
            done();
        })
    });
})