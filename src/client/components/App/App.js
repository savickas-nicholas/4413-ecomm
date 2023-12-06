import React, { useState, useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Alert from '../Alert/Alert';
import Chatbot from '../Chatbot/Chatbot';

import * as auth from '../../util/AuthService';
import * as cartService from '../Cart/CartService';
import usageTracker from '../../util/UsageService';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [message, setMessage] = useState('');
  const [alertState, setAlertState] = useState(null);
  const [alertTimeout, setAlertTimeout] = useState(null);
  const alertRef = useRef(null);

  const navigate = useNavigate();
  usageTracker();

  // on page load
  useEffect(() => {
    // populate currentUser from localStorage on page load
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
     setCurrentUser(currentUser);
    }

    // populate cart from localStorage on page load
    cartService.initCart();
  }, []);


  // create new Alert
  const createAlert = (msg, state) => {
    // if new alert, clear old alerts
    if(alertTimeout) {
      clearTimeout(alertTimeout);
      setAlertTimeout(null);
    }
    setMessage(msg);
    setAlertState(state);
    //alertRef.current.scrollIntoView({ behavior: "smooth" })
    let timeout = setTimeout(() => {
      setMessage('');
      setAlertState(null);
      setAlertTimeout(null);
    }, 3000);
    setAlertTimeout(timeout);
  }

  // log out
  const logOut = () => {
    auth.removeAuthToken();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    createAlert('Logout Successful!', 'success');
    //navigate('/login'); // maybe change to last page
  }

  // log in
  const logIn = (user, token) => {
    auth.setAuthToken(token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    createAlert('Login Successful!', 'success');
    navigate('/', { replace: true }); // change to last page
  }
  
  console.log(currentUser)

  return (
    <React.Fragment>
      <Helmet
        title="MyReactApp"
        titleTemplate="%s - Social App"
        base={{
          href: '/',
        }}
        meta={[
          { charset: 'utf-8' },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
          },
        ]}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
          },
        ]}
      />
      <div>
        <Header isLoggedIn={currentUser !== null} role={currentUser?.role} logOut={logOut}  />
        <Alert ref={alertRef} message={message} alertState={alertState} />
      </div>

      <Chatbot />
      
      <div className="container">
        <Outlet context={{ logIn, createAlert, currentUser }} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
