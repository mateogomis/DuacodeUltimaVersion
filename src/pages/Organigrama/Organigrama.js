import React, { useEffect, useState } from 'react';
import $ from 'jquery'; // Importa jQuery
import axios from 'axios'; // Importa axios para la solicitud a la API
import '../TestCalendario/loader.css';

const Organigrama = () => {
  const [datasource, setDatasource] = useState(null); // Estado para los datos del organigrama

  useEffect(() => {
    // Cargar datos desde la API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/organigrama'); // Cambia la URL según tu endpoint
        console.log('Datos originales desde la API:', response.data);

        // Trabajamos solo con el primer objeto del array (CEO)
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
    if (datasource && typeof $ !== 'undefined' && typeof $.fn.orgchart !== 'undefined') {
      const container = $('#chart-container');
      container.empty(); // Limpia el contenedor antes de inicializar

      // Inicializa orgchart con los datos transformados
      container.orgchart({
        data: datasource,
        nodeContent: 'title', // Usamos "title" para el cargo del empleado
        createNode: function ($node, data) {
          // Agregar foto al nodo si está disponible
          if (data.foto) {
            $node.prepend(
              `<img src="http://localhost:8000${data.foto}" class="node-photo" alt="${data.name}" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 5px;" />`
            );
          }


        },
        render: function () {
          // Aseguramos que todos los nodos hijos del primer nodo estén colapsados inicialmente
          container.find('.children').hide(); // Ocultar todos los nodos hijos

          // Configuración de clic para abrir/cerrar los nodos
          container.find('.node').click(function (event) {
            const $node = $(this);
            const $children = $node.find('.children');
            const $icon = $node.find('.expand-collapse-icon');

            if ($children.length > 0) {
              // Alternar la visibilidad de los hijos al hacer clic
              $children.toggle(); // Esto abrirá o cerrará los nodos hijos

              // Cambiar el ícono de la flecha (expandir/colapsar)
              if ($children.is(':visible')) {
                $icon.text('-'); // Cambia a un "-" si el nodo está expandido
              }
            }
            event.stopPropagation(); // Evitar la propagación del clic a otros nodos
          });

          // Si es el primer nodo, asegurarse de que todos sus hijos estén colapsados
          container.find('.node').first().find('.children').hide();
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
      children: data.children ? data.children.map(transformData) : [], // Procesar recursivamente los hijos
      collapsed: true, // Aseguramos que todos los nodos estén colapsados inicialmente
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
      {!datasource &&   // Carga animacion de carga mientras consulta a la bbdd
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    }
    </div>
  );
};

export default Organigrama;
