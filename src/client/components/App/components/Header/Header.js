
import React from 'react';
import { useState } from 'react';

export default function Header({ isLoggedIn, logOut }) {  
  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">AutoShop</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            { !isLoggedIn && 
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            }
            { !isLoggedIn && 
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
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
            { isLoggedIn && 
              <li className="nav-item">
                <a className="nav-link" href='#' onClick={logOut}>LogOut</a>
              </li>
            }
            <li className="nav-item">
              <a className="nav-link" href="/cart">Cart</a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}


