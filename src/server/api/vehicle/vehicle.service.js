
import User from '../user/user.model';
import Vehicle from './vehicle.model';

async function getAllVehicles(query) {
    return await Vehicle.find(query);
}

async function getVehicle(vehicleId, ) {
    return await Vehicle.findById(vehicleId)
}

async function addNewVehicle(userId, vehicleObj) {
    return await checkAdminRole(userId, async function(err) {
        if (err) {
            throw err;
        }
        else {
            const vehicle = await Vehicle.create(vehicleObj);
            return vehicle;
        }
    })
}

async function removeVehicle(vehicleId, count) {
    const vehicle = await Vehicle.findById(vehicleId);
    const newCount = vehicle.quantity - count;
    vehicle.quantity = Math.max(newCount, 0);

    if (newCount <= 0) {
        Vehicle.deleteOne({ _id: vehicleId });
    } else {
        vehicle.save();
    }
    return vehicle;
}

async function checkAdminRole(userId, status) {
    const user = await User.findById(userId);

    if (user.role === 'admin')
        return status();
    else
        return status(Error('Account does not have applicable user role'));
}

export { getAllVehicles, getVehicle, addNewVehicle, removeVehicle }