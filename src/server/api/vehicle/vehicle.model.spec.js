"use strict"

let { describe, it, expect } = global;

import Vehicle from './vehicle.model';
import VehicleFactory from './vehicle.factory';

describe('Vehicle Model', function() {
    let mockVehicle;
    
    beforeAll(function(done) {
        Vehicle.remove({}, () => done());
    });
  
    beforeEach(function(done) {
        mockVehicle = new Vehicle(VehicleFactory.build());
        done();
    });
  
    afterEach(function(done) {
        Vehicle.remove({}, () => done());
    });

    it('should begin with no vehicles', function(done) {
        Vehicle.find({}, function(err, vehicles) {
            expect(vehicles.length).toEqual(0);
            done();
        });
    });
    
    it('should create a vehicle', function(done) {
        Vehicle.create(mockVehicle, function(err, vehicle) {
            if(err) done(err);
            expect(vehicle).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a vehicle with negative price', function(done) {
        mockVehicle.price = -1.0;
        Vehicle.create(mockVehicle, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a vehicle with negative quantity', function(done) {
        mockVehicle.quantity = -1;
        Vehicle.create(mockVehicle, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a vehicle with negative mileage', function(done) {
        mockVehicle.miles = -1.0;
        Vehicle.create(mockVehicle, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should fail to create a vehicle with wrong mileage units', function(done) {
        mockVehicle.milesUnits = "mm";
        Vehicle.create(mockVehicle, function(err) {
            expect(err).toBeTruthy();
            done();
        })
    });
    
    it('should create vehicle with default mileage', function(done) {
        Vehicle.create(mockVehicle, function(err, vehicle) {
            if(err) done(err);
            expect(vehicle.miles).toEqual(0);
            expect(vehicle.milesUnits).toEqual('km');
            done();
        })
    });
    
    it('should create vehicle with default customizations', function(done) {
        Vehicle.create(mockVehicle, function(err, vehicle) {
            if(err) done(err);
            for (const customization in vehicle.customizations) {
                expect(customization === '').toBeTruthy();
            }
            done();
        })
    });
})