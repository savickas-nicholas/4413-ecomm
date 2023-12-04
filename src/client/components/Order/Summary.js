import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import http from '../../util/httpCaller';
import getImageByPath from '../../util/ImageService';


export default function Summary() {
  const [order, setOrder] = useState({});

  let { orderId } = useParams();

  useEffect(() => {
    http.get(`/api/orders/${orderId}`).then((res) => {
      setOrder(res.data.order);
    });
  }, []);

  return (
    <div>
      <div>Summary for order: {order._id} </div>

      <div>Items Purchased:</div>
      {order.vehicles && order.vehicles.map(vehicle => {
        return (
          <div className='border'>
            <div className="vehicle-info">
              <h6><b>{vehicle.year} {vehicle.brand} {vehicle.model}</b></h6>
            </div>
            <img src={getImageByPath(vehicle.imgPath)} width='300' />
          </div>
        );  
      })}

      <div>
        <div>Status: {order.status}</div>
        <div>Delivery Address: {order.deliveryAddress}</div>
        <div>Delivery Date: {order.deliveryDate}</div>
        <div>Order Total: {order.price}</div>
      </div>
    </div>
  );
}
