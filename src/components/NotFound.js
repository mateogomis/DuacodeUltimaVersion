import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Opcional para estilos

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
