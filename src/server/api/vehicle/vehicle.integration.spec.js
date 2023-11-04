
let { describe, it, expect } = global;

import request from 'supertest';

import app from '../../app';
import * as db from '../../config/testing/testDb';

import Vehicle from './vehicle.model';
import VehicleFactory from './vehicle.factory';

describe('GET api/vehicles/', function() {
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
        const res = await request(app).get('/api/vehicles/');
        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.vehicles).toBeInstanceOf(Array);
    });

    it('should respond with the populated vehicle list', async () => {
        await Vehicle.create(new Vehicle(VehicleFactory.build()));
        await Vehicle.create(new Vehicle(VehicleFactory.build()));

        const res = await request(app).get('/api/vehicles/');
        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.vehicles).toBeInstanceOf(Array);
        expect(res.body.vehicles.length).toBe(2);
    });
})

describe('GET api/vehicles/:id', function() {
    beforeAll(async () => {
        await db.connect()
    });
    
    afterEach(async () => {
        await db.clearDatabase()
    });

    afterAll(async () => {
        await db.closeDatabase()
    });

    it('should respond with the new vehicle', async () => {
        const createdVehicle = await Vehicle.create(new Vehicle(VehicleFactory.build()));

        const res = await request(app).get(`/api/vehicles/${createdVehicle._id.toString()}`);
        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.vehicle._id === createdVehicle._id.toString()).toBeTruthy();
    });
})

// describe('POST api/vehicles/', function() {
//     let admin;
//     let token;

//     beforeAll(async () => {
//         await db.connect()
//     });
    
//     afterEach(async () => {
//         await db.clearDatabase()
//     });

//     afterAll(async () => {
//         await db.closeDatabase()
//     });

//     it('should respond with the created vehicles', async () => {
//         const createdVehicle1 = await Vehicle.create(new Vehicle(VehicleFactory.build()));
//         const createdVehicle2 = await Vehicle.create(new Vehicle(VehicleFactory.build()));
//         const createdVehicle3 = await Vehicle.create(new Vehicle(VehicleFactory.build()));

//         await request(app).post('/api/vehicles/')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             createdVehicle1
//         });
//         await request(app).post('/api/vehicles/')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             createdVehicle2
//         });
//         await request(app).post('/api/vehicles/')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             createdVehicle3
//         });
//         const vehicles = Vehicle.find({});
//         expect(vehicles.length).toBe(3);
//     });
// })

// describe('DELETE api/vehicles/', function() {
//     let admin;
//     let token;
// 
//     beforeAll(async () => {
//         await db.connect()
//     });
    
//     afterEach(async () => {
//         await db.clearDatabase()
//     });

//     afterAll(async () => {
//         await db.closeDatabase()
//     });

//     it('should respond with quantity removed for the new vehicle', async () => {
//         const createdVehicle = await Vehicle.create(new Vehicle(VehicleFactory.build()));
//         const quantityRemoved = 2;

//         const res = await request(app).delete(`/api/vehicles/${createdVehicle._id.toString()}/${quantityRemoved}`);
//         expect(res.status).toBe(202);
//         expect(res.body.vehicle.quantity === createdVehicle.quantity - quantityRemoved).toBeTruthy();
//     });

//     it('should respond with the vehicle deleted', async () => {
//         const createdVehicle = await Vehicle.create(new Vehicle(VehicleFactory.build()));
//         const quantityRemoved = 10;

//         const res = await request(app).delete(`/api/vehicles/${createdVehicle._id.toString()}/${quantityRemoved}`);
//         expect(res.status).toBe(202);
//         expect(res.body.vehicle.quantity === createdVehicle.quantity - quantityRemoved).toBeTruthy();

//         // Check vehicle to see if deleted
//         // const resDeleted = await request(app).delete(`/api/vehicles/${createdVehicle._id.toString()}/${quantityRemoved}`);
//     });
// })

describe('POST api/vehicles/recommendation', function() {
    beforeAll(async () => {
        await db.connect()
    });
    
    afterEach(async () => {
        await db.clearDatabase()
    });

    afterAll(async () => {
        await db.closeDatabase()
    });

    it('should respond with the populated vehicle list', async () => {
        for (let i = 0; i < 5; i++) {
            await Vehicle.create(new Vehicle(VehicleFactory.build()));
        }

        const recommendationForm = {
            price: 20000.0, year: 2021, brand: '', miles: 20000.0, milesUnits: 'km'
        }

        const res = (await request(app).post('/api/vehicles/recommendation').send(recommendationForm));
        expect(res.status).toBe(200);
        expect(res.body.recommendedVehicles.length).toBe(5);
    });

    it('should respond with the filtered vehicle list', async () => {
        const firstVehicle = await Vehicle.create(new Vehicle(VehicleFactory.build()));
        let lowestPrice = firstVehicle.price;
        let lowestYear = firstVehicle.year;

        for (let i = 0; i < 10; i++) {
            await Vehicle.create(new Vehicle(VehicleFactory.build()));
        }

        const recommendationForm = {
            price: 0.0, year: 2020, brand: '', miles: 0.0, milesUnits: 'km'
        }

        const res = (await request(app).post('/api/vehicles/recommendation').send(recommendationForm));
        expect(res.status).toBe(200);
        expect(res.body.recommendedVehicles.length).toBe(5);

        res.body.recommendedVehicles.forEach(vehicle => {
            expect(parseFloat(vehicle.price)).toBe(lowestPrice);
            expect(parseInt(vehicle.year)).toBe(lowestYear);

            lowestPrice += 10000.0;
            lowestYear += 1;
        })
    });
})