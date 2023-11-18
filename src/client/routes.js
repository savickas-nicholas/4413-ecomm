
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import Spinner from 'react-spinkit';

// const options = {
//   fallback: <Spinner name='circle' />,
// };

import App from './components/App/App';
import Home from './components/App/components/Home/HomePage';

import RegistrationPage from './components/Auth/RegistrationPage';
import LoginPage from './components/Auth/LoginPage';
import Cart from './components/Cart/Cart';

import Catalog from './components/Catalog/index';

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Catalog />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]

