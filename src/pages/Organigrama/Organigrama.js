// src/components/Organigrama.js
import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

// Datos de ejemplo para el organigrama
const tree = {
  name: 'CEO',
  children: [
    {
      name: 'CTO',
      children: [
        { name: 'Desarrollador 1' },
        { name: 'Desarrollador 2' }
      ]
    },
    {
      name: 'CFO',
      children: [
        { name: 'Contabilidad' },
        { name: 'Finanzas' }
      ]
    }
  ]
};

const Organigrama = () => {
  return (
    <div>
      <h1>Bienvenido al Organigrama</h1>
      <OrgChart tree={tree} />
    </div>
  );
};

export default Organigrama;