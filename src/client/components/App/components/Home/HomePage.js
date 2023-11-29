import React from 'react';
import cars_image1 from '../../../../assets/cars.jpg';
import cars_image2 from '../../../../assets/cars2.jpg';
import person_computer from '../../../../assets/person-computer.jpg';
import car_shop from '../../../../assets/car-shop.jpg';
import './HomePage.scss';


export default function Home() {
  
  return (
    <div>
      <div className="content-container">
        <div className="content content-text">
          <h2>Offering Affordable Approvals for Credit</h2>
          <p>Browse our catalog to find out how you can save on high quality, brand name vehicles</p>
          <button type="button" class="btn btn-outline-secondary" onClick={() => {}}>Explore More</button>
        </div>
        <div className="content">
          <img src={cars_image1} className="img-fluid content-image" style={{height: '50%'}} />
        </div>
        <div className="content">
          <img src={cars_image2} className="img-fluid content-image" />
        </div>
      </div>

      <div className="content-container">
        <div className="content">
          <img src={person_computer} className="img-fluid content-image" />
        </div>
        <div className="content content-text">
          <h2>Find Out More</h2>
          <p>Have any questions? View our FAQ and get assistance from our chatbot</p>
          <button type="button" class="btn btn-outline-secondary" onClick={() => {}}>View More</button>
        </div>
      </div>

      
      <div className="content-container">
        <div className="content content-text">
          <h2>Fidn The Perfect Match</h2>
          <p>Allow us to select and recommend vehicles that match your preferences</p>
          <button type="button" class="btn btn-outline-secondary" onClick={() => {}}>Get Recommendation</button>
        </div>
        <div className="content">
          <img src={car_shop} className="img-fluid content-image" />
        </div>
      </div>
    </div>
  );
}

