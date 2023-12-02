
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import http from '../../util/httpCaller';
import getImageByPath from '../../util/ImageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faGasPump, faPeopleLine, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [searchText, setSearchText] = useState('');

  // populate vehicles on page load
  useEffect(() => {
    console.log('useeffect')
    http.get('/api/vehicles/').then((res) => {
      let vehicles = res.data.vehicles;
      setVehicles(vehicles);
      setFilteredVehicles(vehicles);

      const brands = [];
      const numberOfPassengers = [];
      vehicles.map(vehicle => {
        if (!brands.includes(vehicle.brand)) brands.push(vehicle.brand);
        if (!numberOfPassengers.includes(vehicle.customizations.numPassengers)) numberOfPassengers.push(vehicle.customizations.numPassengers);
      })

      setBrands(brands);
      setNumberOfPassengers(numberOfPassengers.sort((a,b) => {return a - b}));
    });
  }, []);


  const handleSearch = (e) => {
    setSearchText(e.target.value);
    filterVehicles();
  }

  const filterVehicles = () => {
    const currentFilteredVehicles = vehicles.filter(vehicle => {
      return (
        (filteredYears.length == 0 || filteredYears.includes(vehicle.year)) &&
        (filteredBrands.length == 0 || filteredBrands.includes(vehicle.brand)) &&
        (filteredConditions.length == 0 || filteredConditions.includes(vehicle.customizations.condition)) &&
        (vehicle.price > minPrice) &&
        (vehicle.price < maxPrice) &&
        (searchText == '' || vehicle.name.toLowerCase().includes(searchText.toLowerCase()))
      )
    })

    setFilteredVehicles(currentFilteredVehicles);
  }

  useEffect(() => {
    filterVehicles();
  }, [filteredYears, filteredBrands, filteredConditions, minPrice, maxPrice, searchText])

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

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const addFilteredYear = (year) => {
    if (filteredYears.includes(year)) {
      setFilteredYears(prevFilteredYears => prevFilteredYears.filter(filteredYear => filteredYear !== year));
    } else {
      const updatedFilteredYears = [...filteredYears];
      updatedFilteredYears.push(year);
      setFilteredYears(updatedFilteredYears);
    }
  };

  const addFilteredBrand = (brand) => {
    if (filteredBrands.includes(brand)) {
      const updatedFilteredBrands = filteredBrands.filter(filteredBrand => filteredBrand != brand)
      setFilteredBrands(updatedFilteredBrands);
    } else {
      const updatedFilteredBrands = [...filteredBrands];
      updatedFilteredBrands.push(brand);
      setFilteredBrands(updatedFilteredBrands);
    }
  };

  const addCondition = (condition) => {
    if (filteredConditions.includes(condition)) {
      const updatedFilteredConditions = filteredConditions.filter(filteredCondition => filteredCondition != condition)
      setFilteredConditions(updatedFilteredConditions);
    } else {
      const updatedFilteredConditions = [...filteredConditions];
      updatedFilteredConditions.push(condition);
      setFilteredConditions(updatedFilteredConditions);
    }
  }

  return (
    <div className='flex-sidebar-content'>
        <div className='sidebar-container'>
            <h4>Filter</h4>
            <hr className="bg-dark" />

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
                !expandYear ? (
                  <span className="sidebar-expand click-cursor" onClick={() => setExpandYear(true)}>
                    See More
                  </span>
                )
                :
                (
                  <span className="sidebar-expand click-cursor" onClick={() => setExpandYear(false)}>
                    See Less
                  </span>
                )
              }
            </div>

            <div className='sidebar-filter'>
              <h5>Brand</h5>
              <hr className="bg-dark" />
              {
                brands.slice(0, expandBrand ? brands.length : 5).map(
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
                brands.length > 5 && (!expandBrand ? (
                  <span className="sidebar-expand click-cursor" onClick={() => setExpandBrand(true)}>
                    See More
                  </span>
                )
                :
                (
                  <span className="sidebar-expand click-cursor" onClick={() => setExpandBrand(false)}>
                    See Less
                  </span>
                ))
              }
            </div>

            <div className='sidebar-filter'>
              <h5>Condition</h5>
              <hr className="bg-dark" />
              
              <div className="check-input-container">
                <input class="form-check-input sidebar-check-input" type="checkbox" value=""  id="new" onClick={() => addCondition('New')}></input>
                <label for="new">New</label>
              </div>
              
              <div className="check-input-container">
                <input class="form-check-input sidebar-check-input" type="checkbox" value=""  id="used" onClick={() => addCondition('Used')}></input>
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
            <div className='search'>
              <input type='Search' placeholder='Search' className='form-control'  onChange={handleSearch} />
                <FontAwesomeIcon icon={faMagnifyingGlass} /> 
            </div>
            
            <div className='results-header'>
              <div>{filteredVehicles.length} Results</div>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="catalog-dropdown">
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

            <div className='vehicleList'>
                { filteredVehicles.map(vehicle => {
                  return (
                    <Link to={`/vehicles/${vehicle._id}`} className='card flex-row vehicle-container element-link'>
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
                    </Link>
                  );
                })}
            </div>
        </div>
    </div>
  );
}
