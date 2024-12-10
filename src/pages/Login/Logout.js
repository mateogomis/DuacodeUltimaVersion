import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminamos los tokens de autenticación
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('refresh_token'); 

    navigate('/'); // Redireccionamos a página de inicio
  };

  return (
    <Button variant="danger"className="ms-auto" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
