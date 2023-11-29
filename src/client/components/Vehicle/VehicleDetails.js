
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoanCalculator from '../LoanCalculator/LoanCalculator';

import http from '../../util/httpCaller';

export default function VehicleDetails() {
  const [quantity, setQuantity] = useState(1);
  const [vehicle, setVehicle] = useState({});

  let { vehicleId } = useParams();

  useEffect(() => {
    http.get(`/api/vehicles/${vehicleId}`).then((res) => {
      let vehicle = res.data.vehicle;
      setVehicle(vehicle);
    });
  }, []);

  const addToCart = () => {
    
  }

  return (
    <div className='flex-column-sections'>
        <div className='detailsHeader flex-row'>
            {vehicle.brand} {vehicle.model}
        </div>

        <img src={`${vehicle.brand}_${vehicle.model}.jpg`} />

        <div className='details'>
          <label htmlFor='quantity'>Quantity:</label>
          <input type='number' id='quantity' value={quantity} step='1' 
            min='1' max={vehicle.quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button className='btn btn-secondary' onClick={() => addToCart()}>Add to Cart</button>
        </div>

        <div className='description'>

        </div>

        <LoanCalculator />
    </div>
  );
}

