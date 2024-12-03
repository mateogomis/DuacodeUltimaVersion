import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';


const Organigrama = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos del organigrama
  const chartContainer = useRef(null); // Referencia al contenedor del gráfico

  useEffect(() => {
    // Hacer una solicitud GET para cargar los datos del organigrama
    fetch('http://localhost:8000/api/organigrama')
      .then((response) => response.json())
      .then((data) => {
        // Ajusta los datos si es necesario
        setData(data);
        console.log(data[1])
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    if (data.length > 0 && chartContainer.current) {
      const chart = new OrgChart(); // Crear una nueva instancia del organigrama

      chart
        .container(chartContainer.current) // Conecta el gráfico al contenedor
        .data(data) // Configura los datos
        .nodeHeight((d) => 100) // Altura de los nodos
        .nodeWidth((d) => 150) // Ancho de los nodos
        .nodeContent((d) => {
          console.log("D :", d)
          // Contenido personalizado del nodo
          return `
            <div style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; text-align: center;">
                    <img src="http://localhost:8000${d.data.foto}" alt="${d.data.nombre}" style="width: 70px; height: 70px;  object-fit: cover;" />

              <h3>${d.data.nombre}</h3>
              <p>${d.data.puesto}</p>
            </div>
          `;
        })
        .onNodeClick((node) => alert(`Nodo seleccionado: ${node.data.nombre}`)) // Evento al hacer clic en un nodo
        .render(); // Renderiza el gráfico
    }
  }, [data]); // Este efecto se ejecuta cada vez que los datos cambian

  return (
    <div>
      <h1>Organigrama</h1>
      <div
        ref={chartContainer}
        style={{ width: '100%', height: '600px', border: '1px solid #ddd' }}
      ></div>
    </div>
  );
};

export default Organigrama;

