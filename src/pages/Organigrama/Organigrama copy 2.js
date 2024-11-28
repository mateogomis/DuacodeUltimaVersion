import React, { useEffect, useState } from 'react';
import $ from 'jquery'; // Importa jQuery
import axios from 'axios'; // Importa axios para la solicitud a la API

const Organigrama = () => {
  const [datasource, setDatasource] = useState(null);

  useEffect(() => {
    // Cargar datos desde la API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/organigrama'); // Cambia la URL según tu endpoint
        console.log('Datos originales desde la API:', response.data);

        // Trabajamos solo con el primer objeto del array
        const rootData = response.data[0];
        console.log('Datos seleccionados (root):', rootData);

        // Transformamos los datos al formato esperado
        const formattedData = transformData(rootData);
        console.log('Datos transformados para orgchart:', formattedData);

        setDatasource(formattedData); // Asigna los datos transformados al estado
      } catch (error) {
        console.error('Error al cargar el organigrama:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Verifica que jQuery y orgchart.js estén cargados y que datasource esté disponible
    if (
      datasource &&
      typeof $ !== 'undefined' &&
      typeof $.fn.orgchart !== 'undefined'
    ) {
      const container = $('#chart-container');
      if (container.children().length > 0) {
        container.empty(); // Limpia el contenedor antes de inicializar
      }

      // Inicializa orgchart con los datos transformados
      container.orgchart({
        data: datasource,
        nodeContent: 'title', // Usamos "title" para el cargo del empleado
        createNode: function ($node, data) {
          // Agregar foto al nodo si está disponible
          if (data.foto) {
            $node.prepend(
              `<img src="http://localhost:8000${data.foto}" class="node-photo" alt="${data.name}" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 5px;" />`
            );
          }
        },
        render: function () {
          // Aseguramos que todos los nodos estén cerrados inicialmente
          container.find('.children').hide(); // Ocultar todos los nodos hijos

          // Configuración de clic para abrir/cerrar los nodos
          container.find('.node').click(function (event) {
            const $node = $(this);
            const $children = $node.find('.children');
            if ($children.length > 0) {
              // Alternar la visibilidad de los hijos al hacer clic
              $children.toggle(); // Esto abrirá o cerrará los nodos hijos
            }
            event.stopPropagation(); // Evitar la propagación del clic a otros nodos
          });
        },
      });
    }
  }, [datasource]); // Se ejecuta cuando cambia datasource

  // Función para transformar los datos al formato esperado por orgchart
  const transformData = (data) => {
    return {
      name: `${data.nombre} ${data.apellido_1} ${data.apellido_2}`, // Nombre completo
      title: data.rol.nombre, // Título o cargo del empleado
      foto: data.foto, // URL de la foto
      relationship: data.relationship || '000', // Relación para control del plugin
      children: data.children ? data.children.map(transformData) : [], // Procesar recursivamente los hijos
    };
  };

  return (
    <div
      id="chart-container"
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ddd',
      }}
    >
      {!datasource && <p>Cargando organigrama...</p>}
    </div>
  );
};

export default Organigrama;








// {
//         name: 'Lao Lao',
//         title: 'general manager',
//         children: [
//           {
//             name: 'Bo Miao',
//             title: 'department manager',
//             compact: true,
//             children: [
//               { name: 'Fei Xuan', title: 'engineer' },
//               { name: 'Er Xuan', title: 'engineer' },
//               { name: 'San Xuan', title: 'engineer' },
//               {
//                 name: 'Si Xuan',
//                 title: 'engineer',
//                 compact: true,
//                 children: [
//                   { name: 'Feng Shou', title: 'engineer' },
//                   { name: 'Er Shou', title: 'engineer' },
//                   { name: 'San Shou', title: 'engineer' },
//                   { name: 'Si Shou', title: 'engineer' },
//                 ],
//               },
//               { name: 'Wu Xuan', title: 'engineer' },
//             ],
//           },
//           {
//             name: 'Su Miao',
//             title: 'department manager',
//             children: [
//               { name: 'Tie Hua', title: 'senior engineer' },
//               {
//                 name: 'Hei Hei',
//                 title: 'senior engineer',
//                 children: [
//                   { name: 'Dan Dan', title: 'engineer' },
//                   { name: 'Er Dan', title: 'engineer' },
//                   { name: 'San Dan', title: 'engineer' },
//                   { name: 'Si Dan', title: 'engineer' },
//                   { name: 'Wu Dan', title: 'engineer' },
//                   { name: 'Liu Dan', title: 'engineer' },
//                   { name: 'Qi Dan', title: 'engineer' },
//                   { name: 'Ba Dan', title: 'engineer' },
//                   { name: 'Jiu Dan', title: 'engineer' },
//                   { name: 'Shi Dan', title: 'engineer' },
//                 ],
//               },
//               { name: 'Pang Pang', title: 'senior engineer' },
//             ],
//           },
//           { name: 'Hong Miao', title: 'department manager' },
//         ],
//       };