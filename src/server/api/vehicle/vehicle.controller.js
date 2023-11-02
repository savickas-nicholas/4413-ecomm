import jwt from 'jsonwebtoken';

import { getAllVehicles, 
  getVehicle as getVehicleService, 
  addNewVehicle, 
  removeVehicle as removeVehicleService 
} from './vehicle.service';

// Search for the catalog of vehicles
// Filtering, sorting, etc. will be done on the client with this list of vehicles
export const getVehicles = async (req, res) => {
  let query = req.query || {};

  try {
    const vehicles = await getAllVehicles(query);
    return res.status(200).json({ vehicles });
  } catch(err) {
    return handleError(res, err);
  }
};

// Search the catalog for a vehicle
export const getVehicle = async (req, res) => {
  let vehicleId = req.params.id;

  getVehicleService(vehicleId)
    .then((vehicle) => {
      res.status(200).json({ vehicle });
    })
    .catch(err => handleError(res, err))
}

// Add a new vehicle
export const addVehicle = async (req, res) => {
  try {
    const tokenObj = req.body.token;
    const vehicleObj = req.body.vehicle;

    const decoder = jwt.verify(tokenObj, config.secrets.session)
    const userId = decoder._id;

    let vehicle = await addNewVehicle(userId, vehicleObj);
    return res.status(201).json({ vehicle });
  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

// Delete existing vehicle
export const removeVehicle = (req, res) => {
  const vehicleId = req.params.id;
  const numRemoved = req.params.count;
  removeVehicleService(vehicleId, numRemoved)
  .then((vehicle) => {
    return res.status(200).json({ vehicle });
  }).catch((err) => res.status(500).send(err))
};

// Recommend vehicle based off of form data
export const recommendVehicle = (req, res) => {
  
}

function handleError(res, err) {
  console.log('user handleError --> ', err);
  return res.status(500).send(err);
}
