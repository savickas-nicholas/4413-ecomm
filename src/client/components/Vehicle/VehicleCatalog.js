
import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import http from '../../util/httpCaller';
import getImageByPath from '../../util/CarImageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faGasPump, faPeopleLine } from '@fortawesome/free-solid-svg-icons';
import './vehicle.scss';

export default function Catalog() {

  library.add(faCalendar)
  library.add(faGasPump)
  library.add(faPeopleLine)

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [brands, setBrands] = useState([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState([]);

  const [expandYear, setExpandYear] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);

  const [filteredYears, setFilteredYears] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredCondition, setFilteredCondition] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);

  useEffect(() => {
    http.get('/api/vehicles/').then((res) => {
      let vehicles = res.data.vehicles;
      setVehicles(vehicles);

      const brands = [];
      const numberOfPassengers = [];
      vehicles.map(vehicle => {
        if (!brands.includes(vehicle.brand)) brands.push(vehicle.brand);
        if (!numberOfPassengers.includes(vehicle.customizations.numPassengers)) numberOfPassengers.push(vehicle.customizations.numPassengers);
      })

      setBrands(brands);
      setNumberOfPassengers(numberOfPassengers.sort((a,b) => {return a - b}));
      applyFilter();
    }).catch(err => {
      console.log("Error retrieving vehicles " + err);
    }) 
  }, []);

  const applyFilter = () => {
    const filteredVehicles = vehicles.filter(vehicle => {
      return (
        (filteredYears.length == 0 || filteredYears.includes(vehicle.year)) &&
        (filteredBrands.length == 0 || filteredBrands.includes(vehicle.brand)) &&
        (vehicle.customizations.condition == filteredCondition) &&
        (vehicle.price > minPrice) &&
        (vehicle.price < maxPrice)
      )
    })

    setFilteredVehicles(filteredVehicles);
  }

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    applyFilter();
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    applyFilter();
  };

  const addFilteredYear = (year) => {
    if (filteredYears.includes(year)) {
      setFilteredYears(
        filteredYears.filter(filteredYear => filteredYear != year)
      );
    } else {
      filteredYears.push(year);
    }
    applyFilter();
  };

  const addFilteredBrand = (brand) => {
    if (filteredBrands.includes(brand)) {
      setFilteredBrands(
        filteredBrands.filter(filteredBrand => filteredBrand != brand)
      );
    } else {
      filteredBrands.push(brand);
    }
    applyFilter();
  };

  const addCondition = (condition) => {
    setFilteredCondition(condition);
    applyFilter();
  }

  return (
    <div className='flex-sidebar-content'>
        <div className='sidebar-container'>
            <h4>Filter</h4>
            <hr className="bg-dark" />

            <div className='search'>
              <input type='Search' placeholder='Search' className='form-control' />
            </div>

            <div className='sidebar-filter'>
              <h5>Year</h5>
              <hr className="bg-dark" />
              {
                Array.from({length: expandYear ? 15 : 4}, (_, index) => new Date().getFullYear() - index).map(
                  year => {
                    return (
                      <div className="check-input-container">
                        <input class="form-check-input sidebar-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => addFilteredYear(year)}></input>
                        <h6>{year}</h6>
                      </div>
                    )
                  }
                )
              }
              {
                !expandYear && (
                  <div className="sidebar-expand">
                    See More
                  </div>
                )
              }
            </div>

            <div className='sidebar-filter'>
              <h5>Brand</h5>
              <hr className="bg-dark" />
              {
                brands.map(
                  brand => {
                    return (
                      <div className="check-input-container">
                        <input class="form-check-input sidebar-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => addFilteredBrand(brand)}></input>
                        <label for="flexCheckDefault">{brand}</label>
                      </div>
                    )
                  }
                )
              }
              {
                !expandBrand && (
                  <div className="sidebar-expand" onClick={() => setExpandBrand(!expandBrand)}>
                    See More
                  </div>
                )
              }
            </div>

            <div className='sidebar-filter'>
              <h5>Condition</h5>
              <hr className="bg-dark" />
              
              <div className="check-input-container">
                <input class="form-check-input sidebar-radio" type="radio" value=""  id="new" onClick={() => addCondition('New')}></input>
                <label for="new">New</label>
              </div>
              
              <div className="check-input-container">
                <input class="form-check-input sidebar-radio" type="radio" value=""  id="used" onClick={() => addCondition('Used')}></input>
                <label for="used">Used</label>
              </div>

            </div>

            <div className='sidebar-filter'>
              <h5>Number of Passengers</h5>
              <hr className="bg-dark" />
              {
                numberOfPassengers.map(
                  num => {
                    return (
                      <div className="check-input-container">
                        <input class="form-check-input sidebar-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => addFilteredNumberOfPassengers(year)}></input>
                        <h6>{num}</h6>
                      </div>
                    )
                  }
                )
              }
            </div>

            <h5 className="flex-centered">Price Range</h5>
            <div className='priceRange'>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              -
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className='brandFilter'></div>
            <div className='modelFilter'></div>
            <button className="sidebar-reset">Reset Filter</button>
        </div>

        <div className='catalog-container'>
            <div className='flex-spread results-header'>
              <h4>{vehicles.length} Results</h4>
              <div class="dropdown">
                <button class="btn dropdown-toggle catalog-sort" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort By
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="dropdown-item" type="button">Sort by Price</button>
                  <button class="dropdown-item" type="button">Sort by Hot Deals</button>
                  <button class="dropdown-item" type="button">Sort by Year</button>
                  <button class="dropdown-item" type="button">Sort by Reviews</button>
                </div>
              </div>
            </div>

            <div className='vehicleList'>
                { filteredVehicles.map(vehicle => {
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
        </div>
    </div>
  );
}
