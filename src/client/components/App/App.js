import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Alert from '../Alert/Alert';

import * as auth from '../../util/AuthService';
import * as cartService from '../Cart/CartService';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [message, setMessage] = useState('');
  const [alertState, setAlertState] = useState(null);

  const navigate = useNavigate();

  // populate currentUser from localStorage on page load
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
     setCurrentUser(currentUser);
    }
  }, []);

  // populate cart from localStorage on page load






  // create new Alert
  const createAlert = (msg, state) => {
    setMessage(msg);
    setAlertState(state);
    setInterval(() => {
      setMessage('');
      setAlertState(null);
    }, 5000);
  }

  // log out
  const logOut = () => {
    auth.removeAuthToken();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    createAlert('Logout Successful!', 'Success');
    navigate('/login');
  }

  // log in
  const logIn = (user, token) => {
    auth.setAuthToken(token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    createAlert('Login Successful!', 'Success')
  }
  


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
      <div className="header">
        <Header isLoggedIn={currentUser !== null} logOut={logOut}  />
        <Alert message={message} alertState={alertState} />
      </div>
      
      <div className="container">
        <Outlet context={{ logIn, createAlert }} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
