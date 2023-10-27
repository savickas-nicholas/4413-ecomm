
import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import Spinner from 'react-spinkit';

// const options = {
//   fallback: <Spinner name='circle' />,
// };

import App from './components/App/App';
import Home from './components/App/components/Home/HomePage';


export default [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]

