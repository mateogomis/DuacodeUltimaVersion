/**
 * Componente Logout
 *
 * Este componente representa un botón de cierre de sesión que, cuando se hace clic, elimina los tokens de autenticación del almacenamiento local y redirige al usuario a la página de inicio.
 *
 * Estados:
 * - `navigate`: Se utiliza para redirigir al usuario usando el enrutador de React.
 *
 * Métodos:
 * - `handleLogout`: Elimina los tokens de autenticación (acceso y actualización) del almacenamiento local y redirige al usuario a la página de inicio.
 *
 * UI:
 * - El componente muestra un botón de tipo "danger" con el texto "Logout".
 * - Al hacer clic en el botón, se ejecuta `handleLogout` que elimina los tokens de autenticación y redirige al usuario.
 */

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
