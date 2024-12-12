import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 
import logo from '../assets/images/logo.png';

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={logo} alt="Logo" className="rotating-logo" />
      <h1>404</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
