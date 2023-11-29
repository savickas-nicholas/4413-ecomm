import React from 'react';
import './Footer.scss';

export default function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div className='footer-category'>
          <h4>Account</h4>
          <a href="/account">My Account</a>
          <a href="/login">Login / Register</a>
          <a href="/account">Shop</a>
        </div>
        <div className='footer-category'>
          <h4>Quick Link</h4>
          <a href="/policy">Privacy Policy</a>
          <a href="/tos">Terms Of Use</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <hr className="my-4 bg-light" />
      <p className="footer-copyright">&copy; Copyright 2023. All rights reserved</p>
    </div>
  );
}
