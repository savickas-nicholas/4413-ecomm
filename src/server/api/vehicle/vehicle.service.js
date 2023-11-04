
import User from '../user/user.model';
import Vehicle from './vehicle.model';

async function getAllVehicles(query) {
    return await Vehicle.find(query);
}

async function getVehicle(vehicleId, ) {
    return await Vehicle.findById(vehicleId)
}

async function addNewVehicle(vehicleObj) {
    const vehicle = await Vehicle.create(vehicleObj);
    return vehicle;
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

// Normalizes variables and compares them to determine best recommendation
async function recommendVehicle(price, year, brand, miles, milesUnits) {
    let vehicles = await Vehicle.find({brand});
    if (vehicles.length <= 1) vehicles = await Vehicle.find({});
    
    const minMaxValues = {
        price: 0,
        year: 0,
        miles: 0
    }

    vehicles.forEach(vehicle => {
        minMaxValues.price = Math.max(minMaxValues.price, vehicle.price);
        minMaxValues.year = Math.max(minMaxValues.year, vehicle.year);
        minMaxValues.miles = Math.max(minMaxValues.miles, vehicle.miles);
    })

    const scores = [];

    vehicles.forEach(vehicle => {
        let score = 0;

        score += Math.pow((vehicle.year - year) / minMaxValues.year, 2);
        if (vehicle.milesUnits != milesUnits) miles = convertMileage(miles, vehicle.milesUnits, milesUnits);
        score += Math.pow((vehicle.miles - miles) / minMaxValues.miles, 2);
        score += Math.pow((vehicle.price - price) / minMaxValues.price, 2);
        
        scores.push({ score, vehicle });
    });

    scores.sort((vehicleScore1, vehicleScore2) => { return vehicleScore1.score - vehicleScore2.score });
    return scores.slice(0,5).map(scoresVehicle => { return scoresVehicle.vehicle });
}

function convertMileage(miles, units, intendedUnits) {
    if (units === intendedUnits) return miles;

    if (intendedUnits === "km") return miles / 2.35215;
    else return miles * 2.35215;
}

export { getAllVehicles, getVehicle, addNewVehicle, removeVehicle, recommendVehicle }