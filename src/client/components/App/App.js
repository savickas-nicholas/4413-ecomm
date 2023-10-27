import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Outlet } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


export default function App() {

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
        /*link={[
          {
            rel: 'stylesheet',
            href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
          },
        ]}*/
      />
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
