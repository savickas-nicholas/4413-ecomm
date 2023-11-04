
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';
import { signToken } from '../../auth/auth.service';

import Usage from './usage.model';
import User from '../user/user.model';
import UsageFactory from './usage.factory';
import UserFactory, { AdminFactory } from '../user/user.factory';

describe('POST /api/usage', function() {
    let usage;
    let user;
    let token;
    
    beforeAll(async () => {
        await db.connect();
        await db.clearDatabase();
    });
    beforeEach(async () => {
        usage = await Usage.create(UsageFactory.build());
        user = await User.create(UserFactory.build());
        token = signToken(user._id);
    });
    afterEach(async () => {
        await db.clearDatabase();
    });
    afterAll(async () => {
        await db.closeDatabase();
    });

    it('should fail to add a statistic if not logged in & authenticated', async () => {
        const res = await request(app).post('/api/usage/')
            .send({
                token,
                timeSpent: "10",
                pageViewed: "Page"
            });
        
        expect(res.status).toBe(401);
    })

    it('should add a statistic and give a confirmation', async () => {
        const res = await request(app).post('/api/usage/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                token,
                timeSpent: "10",
                pageViewed: "Page"
            });
        
        expect(res.status).toBe(201);
    })
});

describe('POST /api/usage/statistics', function() {
    let usage;
    let user;
    let token;
    
    beforeAll(async () => {
        await db.connect();
        await db.clearDatabase();
    });
    beforeEach(async () => {
        usage = await Usage.create(UsageFactory.build());
        user = await User.create(AdminFactory.build());
        token = signToken(user._id);
    });
    afterEach(async () => {
        await db.clearDatabase();
    });
    afterAll(async () => {
        await db.closeDatabase();
    });

    it('should give the most recently added statistic', async () => {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 1);

        const endDate = new Date();
        endDate.setHours(startDate.getHours() + 1);

        const res = await request(app).post('/api/usage/statistics')
            .set('Authorization', `Bearer ${token}`)
            .send({
                startDate,
                endDate
            });
        
        expect(res.status).toBe(200);
        expect(res.body.statistics).toBeInstanceOf(Array);
        expect(res.body.statistics.length).toBe(1);
    })

    it('should give an empty list of statistics', async () => {
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 2);

        const endDate = new Date();
        endDate.setHours(startDate.getHours() - 1);

        const res = await request(app).post('/api/usage/statistics')
            .set('Authorization', `Bearer ${token}`)
            .send({
                startDate,
                endDate
            });
        
        expect(res.status).toBe(200);
        expect(res.body.statistics).toBeInstanceOf(Array);
        expect(res.body.statistics.length).toBe(0);
    })
});