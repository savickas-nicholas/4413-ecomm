let { describe, it, expect } = global;

import * as db from '../../config/testing/testDb';

import Order from './order.model';
import OrderFactory from './order.factory';

import User from '../user/user.model';
import UserFactory from '../user/user.factory';

import Vehicle from '../vehicle/vehicle.model';
import VehicleFactory from '../vehicle/vehicle.factory';


describe('Order Model', function() {
    let error;
    
    let mockOrder;
    let mockUser;
    let mockVehicle1;
    let mockVehicle2;
    
    beforeAll(async () => {
        await db.connect();
        await db.clearDatabase();

        mockUser = new User(UserFactory.build());
        mockVehicle1 = new Vehicle(VehicleFactory.build());
        mockVehicle2 = new Vehicle(VehicleFactory.build({
            brand: "Honda",
            model: "Civic"
        }));
    });
  
    beforeEach(async () => {
        mockOrder = new Order(OrderFactory.build());
        error = null;
    });
  
    afterEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.closeDatabase();
    });

    // test cases

    it('should begin with no orders', async () => {
        let orders = await Order.find({});
        expect(orders.length).toEqual(0);
    });
    
    it('should create a valid order', async () => {
        mockOrder.vehicles = [ mockVehicle1._id ];
        mockOrder.user = mockUser._id;

        let order = await Order.create(mockOrder);
        expect(order).toBeTruthy();
    });
    
    it('should fail to create a order if no user is provided', async () => {
        mockOrder.vehicles = [ mockVehicle1._id ];

        try {
            let order = await Order.create(mockOrder);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
    
    it('should fail to create a order if no vehicle is provided', async () => {
        mockOrder.user = mockUser._id;

        try {
            let order = await Order.create(mockOrder);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
    
    it('should fail to create a order if no paymentToken is provided', async () => {
        mockOrder.vehicles = [ mockVehicle1._id ];
        mockOrder.user = mockUser._id;
        mockOrder.paymentToken = null;

        try {
            let order = await Order.create(mockOrder);
        } catch(err) {
            error = err;
        }
        
        expect(error).toBeTruthy();
    });
})