
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import * as cartService from '../Cart/CartService';


export default function Cart() {
  const [items, setItems] = useState([]);

  const { createAlert } = useOutletContext();

  // load cart items on load
  useEffect(() => {
    setItems(cartService.getContents());
  }, []);


  const handleUpdateCart = (vehicle, quantity) => {
    if(quantity < 1) {
      createAlert("Quantity cannot be <1!", "warning");
      return;
    }
    if(quantity > vehicle.quantity) {
      createAlert("Quantity cannot exceed total stock!", "warning");
      quantity = vehicle.quantity;
    }

    cartService.updateCart(vehicle._id, quantity);
    createAlert("Quantity updated!", "success");
    setItems(cartService.getContents());
  }

  const handleRemoveFromCart = (id) => {
    cartService.removeFromCart(id);
    createAlert("Successfully removed from cart!", "success");
    setItems(cartService.getContents());
  }

  const handleClearCart = () => {
    cartService.clearCart();
    createAlert("Cart cleared!", "success");
    setItems(cartService.getContents());
  }


  return (
    <div className='cartContainer'>
      { items.length > 0 ? 
        <div className='cart flex-column'>
          <div className='cartList'>
            { items.map(el => {
              let vehicle = el.item;
              return (
                <div className='cartElem flex-row'>
                  <img src={`${vehicle.brand}_${vehicle.model}.jpg`} width='300' />
                  <div className='flex-column-spread fill'>
                    <div>{`${vehicle.brand} ${vehicle.model}`}</div>
                    <div className='actionBar flex-row'>
                      <div>
                        Quantity: <input type='number' value={el.quantity} 
                          min='1' max={vehicle.quantity} step='1'
                          onChange={(e) => handleUpdateCart(vehicle, e.target.value)} />
                      </div>
                      <div className='false-link' 
                        onClick={(e) => handleRemoveFromCart(el.item._id)}>Remove</div>
                    </div>
                  </div>
                  <div className='flex-centered'>
                    <div>{vehicle.price}</div>
                  </div>
                </div>  
              );
            })}
          </div>
          <div className='flex-centered'>
            <button className='btn btn-secondary' onClick={() => handleClearCart()}>Clear Cart</button>
          </div>
          <div className='flex-centered'>
            <a href='/checkout' className='btn btn-primary' style={{color: 'white'}}>Proceed to Checkout</a>
          </div>
        </div>
      : <div>Your cart is empty!</div>}
    </div>
  );
}

