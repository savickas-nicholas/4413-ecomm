
import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

import LoanCalculator from '../LoanCalculator/LoanCalculator';
import ReviewList from '../Review/ReviewList';

import * as cartService from '../Cart/CartService';

import http from '../../util/httpCaller';

export default function VehicleDetails() {
  const [quantity, setQuantity] = useState(1);
  const [vehicle, setVehicle] = useState({});

  let { vehicleId } = useParams();

  const { createAlert } = useOutletContext();


  useEffect(() => {
    http.get(`/api/vehicles/${vehicleId}`).then((res) => {
      let vehicle = res.data.vehicle;
      setVehicle(vehicle);
      console.log(vehicle)
    });
  }, []);

  

  const changeQuantity = (val) => {
    if(val > vehicle.quantity) {
      val = vehicle.quantity;
      createAlert("Cannot exceed in-stock quantity!", "warning");
    }
    if(val < 1) {
      val = 1;
      createAlert("Cannot specify <1 vehicle!", "warning");
    }
    setQuantity(val);
  }

  const addToCart = () => {
    let currentQuantity = cartService.getCurrentQuantity(vehicle._id);
    if(currentQuantity === 0) {
      cartService.addToCart(vehicle, quantity);
      createAlert("Added to Cart!", "success");
    } else {
      let newQuantity = currentQuantity + quantity;

      // check that total doesnt exceed quantity
      if(newQuantity > vehicle.quantity) {
        newQuantity = vehicle.quantity;
        createAlert("Your cart exceeds our stock quantity for this item and has been adjusted to the maximum quantity available!", "warning")
      } else {
        createAlert("Cart Updated!", "success");
      }
      cartService.updateCart(vehicle._id, newQuantity);
    }
  }

  return (
    <div className='flex-column-sections'>
        <div className='detailsHeader flex-row-spread'>
          <div>{vehicle.brand} {vehicle.model}</div>
          <div>${vehicle.price}</div>
        </div>

        <img src={`${vehicle.brand}_${vehicle.model}.jpg`} />

        <div className='details'>
          <div className='form-group'>
            <label htmlFor='quantity'>Quantity:</label>
            <input type='number' id='quantity' value={quantity} className='form-control' 
              step='1' min='1' max={vehicle.quantity} 
              onChange={(e) => changeQuantity(e.target.value)} />
          </div>
          <button className='btn btn-secondary' onClick={() => addToCart()}>Add to Cart</button>
        </div>

        <div className='description'>

        </div>

        <LoanCalculator propPrice={vehicle.price} />

        <ReviewList vehicleId={vehicleId} />
    </div>
  );
}


