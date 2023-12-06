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
    <div className='flex-column gap-25'>
      <div className='border padding-10 rounded'>Summary for order: {order._id} </div>

      <div className='border padding-10 rounded'>
        <div>Items Purchased:</div>
        <div className='flex-row-wrap'>
          {order.vehicles && order.vehicles.map(vehicle => {
            return (
              <div className='flex-column-align-center'>
                <img src={getImageByPath(vehicle.imgPath)} width='300' />
                <div>
                  <b>{vehicle.year} {vehicle.brand} {vehicle.model}</b>
                </div>
              </div>
            );  
          })}
        </div>
      </div>

      <div className='border padding-10 rounded'>
        <div>Status: {order.status}</div>
        <div>Delivery Address: {order.deliveryAddress}</div>
        <div>Delivery Date: {order.deliveryDate}</div>
        <div>Order Total: {order.price}</div>
      </div>
    </div>
  );
}
