import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Outlet } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import * as auth from '../../util/AuthService';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);



  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
     setCurrentUser(currentUser);
    }
  }, []);

  const logOut = () => {
    auth.removeAuthToken();
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }

  const logIn = (user, token) => {
    auth.setAuthToken(token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
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
      <Header isLoggedIn={currentUser !== null} logOut={logOut}  />
      
      <div className="container">
        <Outlet context={{ logIn }} />
      </div>
      <Footer />
    </React.Fragment>
  );
}
