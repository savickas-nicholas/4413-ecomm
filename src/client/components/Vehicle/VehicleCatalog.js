
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import http from '../../util/httpCaller';

export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    http.get('/api/vehicles/').then((res) => {
      console.log(res);
      let vehicles = res.data.vehicles;
      setVehicles(vehicles);
    });
  }, []);

  return (
    <div className='flex-sidebar-content'>
        <div className='sidebar'>
            <div className='yearFilter'>
              <label htmlFor='yearRange' class="form-label">Year:</label>
              <input type="range" class="form-range" id="yearRange" min="1995" max="2023" step="1.0"  />
            </div>
            <div className='priceRange'>

            </div>
            <div className='brandFilter'></div>
            <div className='modelFilter'></div>
            <button>Reset</button>
        </div>

        <div className='content'>
            <div className='search'>
              <input type='search' placeholder='search' className='form-control' />
            </div>

            <div className='flex-row-spread resultsHeader'>
              <div>N Results</div>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">Action</button>
                  <button class="dropdown-item" type="button">Another action</button>
                  <button class="dropdown-item" type="button">Something else here</button>
                </div>
              </div>
            </div>

            <div className='vehicleList'>
                { vehicles.map(vehicle => {
                  return (
                    <div className='vehicle flex-row'>
                      <div>img</div>
                      <div>
                        <div>{vehicle.model}</div>
                      </div>
                      <a href={`/vehicles/${vehicle._id}`}>Link</a>
                    </div>
                  );
                })}
            </div>
        </div>
    </div>
  );
}


