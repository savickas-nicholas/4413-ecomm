

import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import getImageByPath from '../../util/ImageService';
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
              <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id}
                      className='card flex-row vehicle-container element-link'>
                <img src={getImageByPath(vehicle.imgPath)} />
                <div className="vehicle-info">
                  <h6><b>{vehicle.name}</b></h6>
                  { vehicle && vehicle.discount && vehicle.discount > 0  ?
                    <h4><s>${vehicle.price}</s></h4>
                    :
                    <h4><strong>${vehicle.price}</strong></h4>
                  }
                  { vehicle && vehicle.discount && vehicle.discount > 0  ?
                    <h4 className='promo'><strong>PROMO: ${vehicle.price - (vehicle.price * vehicle.discount)}</strong></h4>
                    :
                    <div></div>
                  }
                  <div className="customizations">
                    <div className="customization">
                      <p>{vehicle.year}</p>
                    </div>
                    
                  </div>
                  <hr className="bg-dark" />
                  <div>
                    Reviews
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      }
    </div>
  );
}




