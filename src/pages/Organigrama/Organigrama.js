import React, { useState, useEffect } from "react";
import OrgChart from "react-orgchart";  // Importar la librería
import "react-orgchart/index.css";      // Importar los estilos de la librería

// Definición de los datos de ejemplo para el organigrama
const initechOrg = {
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  children: [
    {
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      children: [
        {
          name: "And More!!",
          actor: "This is just to show how to build a complex tree with multiple levels of children. Enjoy!"
        }
      ]
    },
    {
      name: "Milton Waddams",
      actor: "Stephen Root"
    },
    {
      name: "Bob Slydell",
      actor: "John C. McGi..."
    }
  ]
};

// Componente personalizado para cada nodo
const MyNodeComponent = ({ node }) => {
  return (
    <div className="initechNode" onClick={() => alert("Hi my real name is: " + node.actor)}>
      {node.name}
    </div>
  );
};

// Componente principal que renderiza el organigrama
const Organigrama = () => {
  return <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />;
};

export default Organigrama;
