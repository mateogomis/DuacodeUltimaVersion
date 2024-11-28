import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'orgchart';
import 'orgchart/dist/css/jquery.orgchart.css';
import './Organigrama.css';

const OrganigramaMateo = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDataForOrgChart = (data) => {
    if (!data) return null;
    return {
      name: data.nombre || 'Sin nombre',
      title: data.rol?.nombre || 'Sin rol',
      children: data.children?.map(formatDataForOrgChart) || []
    };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    fetch('http://localhost:8000/api/organigrama')
      .then((response) => {
        console.log('Estado de la respuesta:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos:', data);
        if (!data || !data[0]) throw new Error('Datos no encontrados');
        const formattedData = formatDataForOrgChart(data[0]);
        console.log('Datos formateados para orgchart:', formattedData);

        $(chartRef.current).orgchart({
          data: formattedData,
          nodeContent: 'title',
          compact: (nodeData) => nodeData?.children?.length >= 10,
          createNode: (node, data) => {
            console.log('Nodo creado:', data);
          }
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setError(`Error al cargar los datos: ${error.message}`);
        setLoading(false);
      });

    return () => {
      if (chartRef.current) {
        $(chartRef.current).empty();
      }
    };
  }, []);

  if (loading) {
    return <div>Cargando datos del organigrama...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Organigrama Mateo</h1>
      <div id="chart-container" ref={chartRef}></div>
    </div>
  );
};

export default OrganigramaMateo;
