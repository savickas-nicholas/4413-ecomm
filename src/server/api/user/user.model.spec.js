let { describe, it, expect } = global;

import * as db from '../../config/testing/testDb';

import User from './user.model';
import UserFactory from './user.factory';

describe('User Model', function() {
    let mockUser;
    let error = null;
    
    beforeAll(async () => {
        await db.connect();
        await db.clearDatabase();
    });
  
    beforeEach(async () => {
        mockUser = new User(UserFactory.build());
        error = null;
    });
  
    afterEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.closeDatabase();
    });

    // test cases

    it('should begin with no users', async () => {
        let users = await User.find({});
        expect(users.length).toEqual(0);
    });
    
    it('should create a valid user', async () => {
        let user = await User.create(mockUser);
        expect(user).toBeTruthy();
    });
    
    it('should fail to create a user with a duplicate email', async () => {
        mockUser.email = "test@example.com";
        let mockUser2 = new User(UserFactory.build());
        mockUser2.email = "test@example.com";

        let user = await User.create(mockUser);

        try {
            let user2 = await User.create(mockUser2);
        } catch(err) {
            error = err;
        }

        expect(error).toBeTruthy();
    });
    
    it('should fail to create a user with no email', async () => {
        mockUser.email = '';
        
        try {
            let user = await User.create(mockUser);
        } catch(err) {
            error = err;
        }

        expect(error).toBeTruthy();
    });

    it('should fail to create a user with an invalid email format', async () => {
        mockUser.email = 'testgmailaddress';

        try {
            let user = await User.create(mockUser);
        } catch(err) {
            error = err;
        }

        expect(error).toBeTruthy();
    });

})