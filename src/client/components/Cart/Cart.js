
import React, { useState, useEffect } from 'react';


import * as cartService from '../Cart/CartService';


export default function Cart() {
  const [items, setItems] = useState([]);

  // load cart items on load
  useEffect(() => {
    setItems(cartService.getContents());
  }, []);


  const handleUpdateCart = (id, quantity) => {
    //cartService.updateCart(id);
    setItems(cartService.getContents());
  }

  const handleRemoveFromCart = (id) => {
    cartService.removeFromCart(id);
    setItems(cartService.getContents());
  }

  const handleClearCart = () => {
    cartService.clearCart();
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
                          onChange={(e) => handleUpdateCart(vehicle._id, e.target.value)} />
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

