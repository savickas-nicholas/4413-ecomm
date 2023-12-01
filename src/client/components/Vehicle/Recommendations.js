

import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

import getImageByPath from '../../util/CarImageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import http from '../../util/httpCaller';

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);

  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [miles, setMiles] = useState('');


  const handleSubmit = (se) => {
    se.preventDefault();
    
    http.post('api/vehicles/recommendation', {
      price,
      year, 
      brand,
      miles,
      milesUnits: 'km'
    }).then(res => {
      console.log(res);
      setRecommendations(res.data.recommendedVehicles);
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
      <Helmet title='Vehicle Recommendations.' />
      <h4>Recommendation Form</h4>
      <form name='recommendationForm' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='price'>I want to pay: </label>
          <input type='number' name='price' value={price} onChange={(e) => setPrice(e.target.value)} 
            min='0' max='1000000' step='1000' className='form-control' id='price' required />
        </div>
        <div className='form-group'>
          <label htmlFor='year'>Year: </label>
          <input type='number' name='year' value={year} onChange={(e) => setYear(e.target.value)} 
            className='form-control' id='year' required></input>
        </div>
        <div className='form-group'>
          <label htmlFor='brand'>Brand: </label>
          <input type='text' name='brand' value={brand} onChange={(e) => setBrand(e.target.value)} 
            className='form-control' id='brand' required></input>
        </div>
        <div className='form-group'>
          <label htmlFor='miles'>Mileage (in km): </label>
          <input type='number' name='miles' value={miles} onChange={(e) => setMiles(e.target.value)} 
            className='form-control' id='miles' required></input>
        </div>
        <button type='submit' className='minimal-btn'>Get Recommendations</button>
      </form>
      <hr />
      { recommendations.length > 0 && 
        <div className='resultsContainer'>
          <h5>Results</h5>
          { recommendations.map(vehicle => {
            return (
              <div className='card flex-row vehicle-container'>
                <img src={getImageByPath(vehicle.imgPath)} />
                <div className="vehicle-info">
                  <h6><b>{vehicle.name}</b></h6>
                  <h4><strong>${vehicle.price}</strong></h4>
                  <div className="customizations">
                    <div className="customization">
                      <FontAwesomeIcon icon="calendar" />
                      <p>{vehicle.year}</p>
                    </div>

                    <div className="customization">
                      <FontAwesomeIcon icon="gas-pump" />
                      <p>{vehicle.customizations.engine}</p>
                    </div>

                    <div className="customization">
                      <FontAwesomeIcon icon="people-line" />
                      <p>{vehicle.customizations.numPassengers}</p>
                    </div>
                    
                  </div>
                  <hr className="bg-dark" />
                  <div>
                    Reviews
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}




