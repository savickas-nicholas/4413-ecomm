"use strict"

let { describe, it, expect } = global;

import Vehicle from './vehicle.model';
import VehicleFactory from './vehicle.factory';
import db from '../../db';

describe('Vehicle Model', function() {
    let mockVehicle;
    
    beforeAll(async function() {
        await db();
        await Vehicle.deleteMany({});
    });
  
    beforeEach(function() {
        mockVehicle = new Vehicle(VehicleFactory.build());
    });
  
    afterEach(async function() {
        await Vehicle.deleteMany({});
    });

    it('should begin with no vehicles', function(done) {
        Vehicle.find({}).then(vehicles => {
            expect(vehicles.length).toEqual(0);
            done();
        }).catch(err => {
            done(err);
        });
    });
    
    it('should create a vehicle', function(done) {
        Vehicle.create(mockVehicle).then(vehicle => {
            expect(vehicle).toBeTruthy();
            done();
        }).catch(err => {
            done(err);
        });
    });
    
    it('should create vehicle with default mileage', function(done) {
        Vehicle.create(mockVehicle).then(vehicle => {
            expect(vehicle.miles).toEqual(0);
            expect(vehicle.milesUnits).toEqual('km');
            done();
        }).catch(err => {
            done(err);
        });
    });
    
    it('should create vehicle with default customizations', function(done) {
        Vehicle.create(mockVehicle).then(vehicle => {
            expect(!vehicle.customizations.colour).toBeTruthy();
            expect(!vehicle.customizations.condition).toBeTruthy();
            expect(!vehicle.customizations.engine).toBeTruthy();
            expect(!vehicle.customizations.trim).toBeTruthy();
            done();
        }).catch(err => {
            done(err);
        });
    });
})