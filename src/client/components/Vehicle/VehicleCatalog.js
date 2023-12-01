
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Dropdown from 'react-bootstrap/Dropdown';


import http from '../../util/httpCaller';

export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState(null);


  // populate vehicles on page load
  useEffect(() => {
    console.log('useeffect')
    http.get('/api/vehicles/').then((res) => {
      setVehicles(res.data.vehicles);
    });
  }, []);


  const handleSearch = () => {

  }

  // 
  const filterVehicles = () => {


  }

  // field --> the field to sort by 
  // descending --> boolean
  const sortVehicles = (field, descending) => {
    console.log('hello')
    let arr = vehicles;
    arr.sort((a, b) => {
      if(a[field] < b[field]) {
        return -1;
      } else if(a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(arr)
    if(descending) arr.reverse();
    setVehicles(arr);
  }


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
              <span className='click-cursor' onClick={() => handleSearch()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> 
              </span>
              <input type='search' placeholder='search' className=''/>
            </div>

            <div className='flex-row-spread resultsHeader'>
              <div>{vehicles.length} Results</div>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Sort by: 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => sortVehicles('price', false)} >Price: Low to High</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortVehicles('price', true)} >Price: High to Low</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortVehicles('miles', false)} >Mileage: Low to High</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortVehicles('miles', true)} >Mileage: High to Low</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className='vehicleList flex-column'>
                { vehicles.map(vehicle => {
                  return (
                    <a href={`/vehicles/${vehicle._id}`} className='vehicleContainer element-link' >
                      <div className='vehicle flex-row'>
                        <div>
                          <img src={`${vehicle.brand}_${vehicle.model}.jpg`} width='250'/>
                        </div>
                        <div className='flex-column'>
                          <div>{`${vehicle.brand} ${vehicle.model}`}</div>
                          <div>${vehicle.price}</div>
                          <hr />
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
        </div>
    </div>
  );
}


