
import React from 'react';
import { useState } from 'react';

export default function Header({ isLoggedIn }) {  
  
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            { !isLoggedIn && 
              <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
              </li>
            }
            { !isLoggedIn && 
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
            }
            { isLoggedIn && 
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  More
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Profile</a>
                  <a class="dropdown-item" href="#">Orders</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Log Out</a>
                </div>
              </li>
            }
            <li class="nav-item">
                <a class="nav-link" href="#">Cart</a>
              </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}


