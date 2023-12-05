
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
import Checkout from './components/Order/Checkout';
import Summary from './components/Order/Summary';

import Catalog from './components/Vehicle/VehicleCatalog';
import VehicleDetails from './components/Vehicle/VehicleDetails';
import Recommendations from './components/Vehicle/Recommendations';
import Comparison from './components/Vehicle/Comparison';
import Analytics from './components/Report/Analytics';

export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/vehicles/:vehicleId",
        element: <VehicleDetails />,
      },
      {
        path: "/vehicles/recommendations",
        element: <Recommendations />,
      },
      {
        path: "/vehicles/:vehicleId/compare",
        element: <Comparison />,
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
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orders/:orderId",
        element: <Summary />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
]
