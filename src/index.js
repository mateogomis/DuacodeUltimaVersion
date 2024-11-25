import React from 'react';
import ReactDOM from 'react-dom/client'; // Usa createRoot de ReactDOM
import App from './App';
import './styles/variables.css'; // Variables globales
import './styles/mixins.css'; // Mixins y utilidades globales
import './App.css'; // Estilos globales

// Obtén el elemento raíz del DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación con React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
