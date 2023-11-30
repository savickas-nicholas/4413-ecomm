

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import * as cartService from '../Cart/CartService';

import http from '../../util/httpCaller';
import { processPayment } from '../../../server/payment/payment.controller';

// states -> checkUser, shippingInfo, processPayment, review
export default function Checkout() {
  const [state, setState] = useState('checkUser');
  
  const [user, setUser] = useState();
  const [paymentToken, setPaymentToken] = useState();
  const [price, setPrice] = useState();
  
  const [date, setDate] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [postalCode, setPostalCode] = useState();
  const [fullAddress, setFullAddress] = useState();

  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cardCode, setCardCode] = useState();

  const { currentUser } = useOutletContext();

  const navigate = useNavigate();

  // add load state from localStorage

  useEffect(() => {
    if(currentUser) {
      setState('shippingInfo');
      setUser(currentUser);
    } else {
      setState('checkUser')
    }
  }, [ currentUser ]);


  const goBack = () => {
    if(state === 'shippingInfo') {
      setState('checkUser');
    } else if (state === 'processPayment') {
      setState('shippingInfo');
    } else if (state === 'review') {
      setState('processPayment');
    }
  }

  const checkoutAsGuest = () => {
    setUser({ name: 'Guest' });
    setState('shippingInfo');
  }

  const goToPayment = () => {
    setFullAddress(`${street}, ${city}, ${country}, ${postalCode}`);
    setState('processPayment');
  } 

  const processPayment = () => {
    let price = calculatePrice();
    setPrice(price);
    return http.post('/payment/validate', {
      cardNumber,
      nameOnCard: cardName,
      authCode: cardCode
    }).then(res => {
      setPaymentToken(res.data.token);
      setState('review');
    }).catch(err => {
      console.log(err.message);
    })
  } 

  // calculate final price
  const calculatePrice = () => {
    let subtotal = 0;
    for(let v of cartService.getContents()) {
      subtotal += v.quantity * v.item.price;  
    }
    console.log(subtotal)
    return subtotal * 1.13;
  }

  // convert vehicles from cartService into correct format for API
  const extractVehicles = () => {
    let res = [];
    let vehicles = cartService.getContents();
    for(let v of vehicles) {
      for(let i = 0; i < Number.parseInt(v.quantity); i++) {
        res.push(v.item._id);
      }
    }
    return res;
  }

  /*
      *  price
  *  deliveryDate
  *  deliveryAddress
  *  paymentToken
  vehicles
  user
  */
  const placeOrder = () => {
    let payload = { 
      price,
      deliveryAddress: fullAddress, 
      deliveryDate: date,
      paymentToken,
    }

    if(currentUser) {
      payload.user = currentUser._id;
    }

    payload.vehicles = extractVehicles();
    
    http.post('api/orders/', payload).then(res => {
      console.log(res);
      
      // clear cart
      cartService.clearCart();
      
      // go to order summary page
      navigate(`/orders/${res.data.order._id}`, { replace: true });
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      { state === 'checkUser' && (
        <div>
          <button>Login</button>
          <button onClick={() => checkoutAsGuest() }>Checkout as Guest</button>
        </div>
      )}
      { state === 'shippingInfo' && (
        <div>
          <div>Shipping Info</div>
          <div>
            <div className='form-group'>
              <label htmlFor='street'>Street Address: </label>
              <input type='text' name='orderStreet' value={street} onChange={(e) => setStreet(e.target.value)} 
                className='form-control' id='street' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='street'>City: </label>
              <input type='text' name='orderCity' value={city} onChange={(e) => setCity(e.target.value)} 
                className='form-control' id='city' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='country'>Country: </label>
              <input type='text' name='orderCountry' value={country} onChange={(e) => setCountry(e.target.value)} 
                className='form-control' id='country' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='street'>Postal Code: </label>
              <input type='text' name='orderPostalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} 
                className='form-control' id='postalCode' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='date'>Date: </label>
              <input type='date' name='orderDate' value={date} onChange={(e) => setDate(e.target.value)} 
                className='form-control' id='date' required></input>
            </div>
          </div>
          <button onClick={() => goBack()}>Back</button>
          <button onClick={() => goToPayment()}>Proceed to Payment</button>
        </div>
      )}
      { state === 'processPayment' && (
        <div>
          <div>Payment Info</div>
          <div>
            <div className='form-group'>
              <label htmlFor='cardName'>Name on Card: </label>
              <input type='text' name='orderCardName' value={cardName} onChange={(e) => setCardName(e.target.value)} 
                className='form-control' id='cardName' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='cardNumber'>Card Number: </label>
              <input type='text' name='orderCardNumber' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} 
                className='form-control' id='cardNumber' required></input>
            </div>
            <div className='form-group'>
              <label htmlFor='cardCode'>Security Code: </label>
              <input type='text' name='orderCardCode' value={cardCode} onChange={(e) => setCardCode(e.target.value)} 
                className='form-control' id='cardCode' required></input>
            </div>
          </div>
          <button onClick={() => goBack()}>Back</button>
          <button onClick={() => processPayment()}>Process Payment</button>
        </div>
      )}
      { state === 'review' && (
        <div>
          <div>Order Summary for {user.name}</div>
          <div>
            <div>Delivery Address: {fullAddress}</div>
            <div>Delivery Date: {date}</div>
            <div>Total Price: {price}</div>
          </div>
          <button onClick={() => goBack()}>Back</button>
          <button onClick={() => placeOrder()}>Place Order</button>
        </div>
      )}
    </div>
  );
}