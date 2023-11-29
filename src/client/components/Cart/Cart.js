
import React, { useState, useEffect } from 'react';

import * as cartService from '../Cart/CartService';


export default function Cart() {
  const [items, setItems] = useState([]);

  // load cart items on load
  useEffect(() => {
    setItems(cartService.getContents());
    console.log('contents --> ', items)
  }, []);


  return (
    <div className='cartContainer'>
      { items.length > 0 ? 
        <div className='cartList'>
          { items.map(el => {
            return (
              <div className='cartElem'>
                <div>Quantity: {el.quantity}</div>
                <div>Item: {el.item.name}</div>
              </div>
            );
          })}
        </div>
      : <div>Your cart is empty!</div>}
    </div>
  );
}

