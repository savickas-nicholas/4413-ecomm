
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import getImageByPath from '../../util/ImageService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faGasPump, faPeopleLine } from '@fortawesome/free-solid-svg-icons';
import './vehicle.scss';

import http from '../../util/httpCaller';

export default function Comparison() {

  library.add(faCalendar)
  library.add(faGasPump)
  library.add(faPeopleLine)
  
  let { vehicleId } = useParams();

  const [vehicle, setVehicle] = useState({});
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleComparison, setVehicleComparison] = useState({});
  const [otherVehicle, setOtherVehicle] = useState({});

  useEffect(() => {
    http.get('/api/vehicles/').then((res) => {
      let vehicles = res.data.vehicles;
      
      vehicles.forEach((vehicle, index) => {
        if (vehicle._id === vehicleId) {
          setVehicle(vehicle);
          vehicles.splice(index, 1);
        }
      })
      
      setVehicleList(vehicles);
    });
  }, [])

  useEffect(() => {
    if (vehicleList.length > 0) toggleVehicle(vehicleList[0]);
  }, [vehicle])

  const toggleVehicle = (nextVehicle) => {
    const nextVehicleComparison = {
      'Brand': [vehicle.brand, nextVehicle.brand],
      'Model': [vehicle.model, nextVehicle.model],
      'Year': [vehicle.year, nextVehicle.year],
      'Price': ['$' + vehicle.price, '$' + nextVehicle.price],
      'Mileage': [vehicle.miles + ' ' + vehicle.milesUnits, nextVehicle.miles + ' ' + nextVehicle.milesUnits],
      'Hot Deal': [vehicle.activeDeal ? "Yes" : "No", nextVehicle.activeDeal ? "Yes" : "No"],
      'Condition': [vehicle.customizations?.condition, nextVehicle.customizations?.condition],
      'Colour': [vehicle.customizations?.colour, nextVehicle.customizations?.colour],
      'Fuel Type': [vehicle.customizations?.engine, nextVehicle.customizations?.engine],
      'Number of Passengers': [vehicle.customizations?.numPassengers, nextVehicle.customizations?.numPassengers]
    }
    
    setOtherVehicle(nextVehicle);
    setVehicleComparison(nextVehicleComparison);
  }

  return (
    <div className='comparisonContent'>
      <div className='comparisonHeader'>
        <Link  to={`/vehicles/${vehicle._id}`}>{'<<<'}</Link>
        <h2>Compare Vehicles</h2>
        <div></div>
      </div>
      <div className='comparisonContainer'>
        <div className='comparisonGrid'>
          <div className='comparisonGridItem comparisonLight'></div>
          <div className='comparisonGridItem comparisonLight'>
            <img src={getImageByPath(vehicle.imgPath)} />
            <h6><b>{vehicle.name}</b></h6>
          </div>
          <div className='comparisonGridItem comparisonLight'>
            <img src={getImageByPath(otherVehicle.imgPath)} />
            <h6><b>{otherVehicle.name}</b></h6>
          </div>

          {
            Object.keys(vehicleComparison).map((key, index) => {
              return (
                <>
                  <div className={'comparisonGridItem ' + (index % 2 == 0 ? 'comparisonDark' : 'comparisonLight')}>{key}</div>
                  <div className={'comparisonGridItem ' + (index % 2 == 0 ? 'comparisonDark' : 'comparisonLight')}>
                    <h6><strong>{vehicleComparison[key][0]}</strong></h6>
                  </div>
                  <div className={'comparisonGridItem ' + (index % 2 == 0 ? 'comparisonDark' : 'comparisonLight')}>
                    <h6><strong>{vehicleComparison[key][1]}</strong></h6>
                  </div>
                </>
              )
            })
          }

          {/* <div className='comparisonGridItem'>Brand</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.brand}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.brand}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Model</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.model}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.model}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Year</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.year}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.year}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Price</div>
          <div className='comparisonGridItem'>
            <h6><strong>${vehicle.price}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>${otherVehicle.price}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Mileage</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.miles} {vehicle.milesUnits}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.miles} {otherVehicle.milesUnits}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Hot Deal</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.activeDeal ? "Yes" : "No"}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.activeDeal ? "Yes" : "No"}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Condition</div>
          <div className='comparisonGridItem'>
            <h6><strong>{vehicle.customizations?.condition}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.condition}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Colour</div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.colour}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.colour}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Fuel Type</div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.engine}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.engine}</strong></h6>
          </div>

          <div className='comparisonGridItem'>Number of Passengers</div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.numPassengers}</strong></h6>
          </div>
          <div className='comparisonGridItem'>
            <h6><strong>{otherVehicle.customizations?.numPassengers}</strong></h6>
          </div> */}
        </div>
      </div>

      <div className='comparisonList'>
        {
          vehicleList.map(
            vehicle => {
              return (
                <button className={vehicle._id === otherVehicle._id ? 'selectedComparisonItem' : 'comparisonItem'} onClick={() => toggleVehicle(vehicle)}>
                  <img src={getImageByPath(vehicle.imgPath)} />
                  <div className="customizationVehicle">
                    <h6><b>{vehicle.name}</b></h6>
                    <h4><strong>${vehicle.price}</strong></h4>
                    <div className="customizations">
                      <div className="comparisonCustomization">
                        <FontAwesomeIcon icon="calendar" />
                        <p>{vehicle.year}</p>
                      </div>

                      <div className="comparisonCustomization">
                        <FontAwesomeIcon icon="gas-pump" />
                        <p>{vehicle.customizations.engine}</p>
                      </div>

                      <div className="comparisonCustomization">
                        <FontAwesomeIcon icon="people-line" />
                        <p>{vehicle.customizations.numPassengers}</p>
                      </div>
                      
                    </div>
                    <hr className="bg-dark" />
                  </div>
                </button>
              )
            }
          )
        }
      </div>
    </div>
  );
}

