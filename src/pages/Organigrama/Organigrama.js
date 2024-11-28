// src/components/Organigrama.js

import React from 'react';
// import OrgChart from 'awesome-react-org-chart'; // Importamos la librería
// import 'awesome-react-org-chart/dist/style.css'; // Importamos el estilo de la librería

// Datos de ejemplo para el organigrama
const data = {
  id: 1,
  name: "CEO",
  children: [
    {
      id: 2,
      name: "CTO",
      children: [
        {
          id: 3,
          name: "Dev 1"
        },
        {
          id: 4,
          name: "Dev 2"
        }
      ]
    },
    {
      id: 5,
      name: "CFO"
    }
  ]
};

const Organigrama = () => {
  return (
    <div>
      { <h1>Organigrama de la Empresa</h1> }
      {/* <OrgChart
        tree={data} // El objeto que contiene la jerarquía
        renderNode={(node) => (
          <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 5 }}>
            <strong>{node.name}</strong>
          </div>
         )} 
      /> */}
    </div>
  );
}

export default Organigrama;

