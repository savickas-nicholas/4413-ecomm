
import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

import LoanCalculator from '../LoanCalculator/LoanCalculator';
import ReviewList from '../Review/ReviewList';

import * as cartService from '../Cart/CartService';
import getImageByPath from '../../util/ImageService';

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

  function formatDollarValue(price) {
    const numberValue = Number(price.replace(/[^0-9.-]+/g, ''));
    if (isNaN(numberValue)) {
      return price;
    }
  
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numberValue);
  
    return formattedPrice;
  }

  return (
    <div className='flex-column-sections detailsContainer'>
      <div className='detailsHeader flex-row-spread'>
        <div className="detailsName">{vehicle.year} {vehicle.brand} {vehicle.model}</div>
        <div className="detailsPrice"><b>{formatDollarValue(String(vehicle.price))}</b></div>
      </div>

        <div className='detailsImgContainer'>
          <img src={getImageByPath(vehicle.imgPath)} className="detailsImg" />
        </div>

        <div className='details'>
          <div className='form-group'>
            <label htmlFor='quantity'>Quantity:</label>
            <input type='number' id='quantity' value={quantity} className='form-control' 
              step='1' min='1' max={vehicle.quantity} 
              onChange={(e) => changeQuantity(e.target.value)} />
          </div>
          <button className='btn btn-secondary' onClick={() => addToCart()}>Add to Cart</button>
        </div>

        <div className='vehicleCustomizations'>
          <div>
            <div className="vehicleDetails">
              <div>Mileage: {vehicle.miles} {vehicle.milesUnits}</div>
              <div>Fuel Type: {vehicle.customizations?.engine || 'Please contact dealer for specifics!'}</div>
              <div>Number of Passengers: {vehicle.customizations?.numPassengers || 'Please contact dealer for specifics!'}</div>
              <div>Colour: {vehicle.customizations?.colour || 'Please contact dealer for specifics!'}</div>
              <div>Condition: {vehicle.customizations?.condition || 'Please contact dealer for specifics!'}</div>
            </div>
            <a href={`/vehicles/${vehicle._id}/compare`} className='btn vehicleCompare'>Compare</a>
          </div>
        </div>
        <div className='vehicleDescription'>
          <h4>Car Description</h4>
          <div>{vehicle.description}</div>
        </div>

        <LoanCalculator propPrice={vehicle.price} />

        <ReviewList vehicleId={vehicleId} />
    </div>
  );
}


