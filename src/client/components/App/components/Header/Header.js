
import React from 'react';
import { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import logo from '../../../../assets/logo-autoshop.png';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header({ isLoggedIn, logOut }) {  

  library.add(faShoppingCart)
  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="header-container">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/catalog">Catalog <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              { isLoggedIn ? 
                  <li className="nav-item">
                    <a className="nav-link" href='#' onClick={logOut}>Log Out</a>
                  </li>
                :
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Sign In</a>
                  </li>
              }
              { !isLoggedIn && 
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              }

              { /*isLoggedIn && 
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Orders</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={logOut}>Log Out</a>
                  </div>
                </li>
              */}
            </ul>
          </div>
          
          <a className="nav-link" href="/cart">
            <FontAwesomeIcon icon="shopping-cart" />
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
}