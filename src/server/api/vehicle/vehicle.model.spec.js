
let { describe, it, expect } = global;

import * as db from '../../config/testing/testDb';

import Vehicle from './vehicle.model';
import VehicleFactory from './vehicle.factory';


describe('Vehicle Model', function() {
    let mockVehicle;
    
    beforeAll(async () => {
        await db.connect();
        await Vehicle.deleteMany({}); 
    });

    afterAll(async () => {
        await db.closeDatabase();
    })
  
    beforeEach(async () => {
        mockVehicle = new Vehicle(VehicleFactory.build());
    });
  
    afterEach(async () => {
        await Vehicle.deleteMany({}); 
    });

    // tests

    it('should begin with no vehicles', async () => {
        let vehicles = await Vehicle.find({});
        expect(vehicles.length).toEqual(0);
    });
    
    it('should create a vehicle', async () => {
        let vehicle = await Vehicle.create(mockVehicle);
        expect(vehicle).toBeTruthy();
    });
    
    it('should fail to create a vehicle with negative price', async () => {
        mockVehicle.price = -1.0;
        try {
            let vehicle = await Vehicle.create(mockVehicle);
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
    
    it('should fail to create a vehicle with negative quantity', async () => {
        mockVehicle.quantity = -1;
        try {
            let vehicle = await Vehicle.create(mockVehicle);
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
    
    it('should fail to create a vehicle with negative mileage', async () => {
        mockVehicle.miles = -1.0;
        try {
            let vehicle = await Vehicle.create(mockVehicle);
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
    
    it('should fail to create a vehicle with wrong mileage units', async () => {
        mockVehicle.milesUnits = "mm";
        try {
            let vehicle = await Vehicle.create(mockVehicle);
        } catch(err) {
            expect(err).toBeTruthy();
        }
    });
    
    it('should create vehicle with default mileage', async () => {
        let vehicle = await Vehicle.create(mockVehicle);
        expect(vehicle.miles).toEqual(0);
        expect(vehicle.milesUnits).toEqual('km');
    });
    
    it('should create vehicle with default customizations', async () => {
        let vehicle = await Vehicle.create(mockVehicle);
        for (const customization in vehicle.customizations) {
            expect(customization === '').toBeTruthy();
        }
    });
})