
import React from 'react';
import logo from '../../../../assets/logo-autoshop.png';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, role, logOut }) {  

  library.add(faShoppingCart)
  
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="header-container">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/catalog">Catalog <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">About</Link>
              </li>
              { isLoggedIn && role == 'admin' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/analytics">Analytics</Link>
                </li>
              }
              { isLoggedIn ? 
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logOut}>Log Out</Link>
                  </li>
                :
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                  </li>
              }
              { !isLoggedIn && 
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
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
          
          <Link className="nav-link" to="/cart">
            <FontAwesomeIcon icon="shopping-cart" />
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}