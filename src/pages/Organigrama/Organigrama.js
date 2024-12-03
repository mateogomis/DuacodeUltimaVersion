import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import './Organigrama.css';
import 'orgchart/dist/css/jquery.orgchart.css';

const Organigrama = () => {
  const [datasource, setDatasource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/organigrama');
        console.log('Datos originales desde la API:', response.data);

        const rootData = response.data[0];
        console.log('Datos seleccionados (root):', rootData);

        const formattedData = transformData(rootData);
        console.log('Datos transformados para orgchart:', formattedData);

        setDatasource(formattedData);
      } catch (error) {
        console.error('Error al cargar el organigrama:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (datasource && typeof $ !== 'undefined' && typeof $.fn.orgchart !== 'undefined') {
      const container = $('#chart-container');
      container.empty();

      const adjustZoom = () => {
        const width = window.innerWidth;
        let zoomLevel = 1;

        if (width <= 480) {
          zoomLevel = 0.6; // Pantallas pequeñas (móviles)
        } else if (width <= 768) {
          zoomLevel = 0.8; // Tablets
        } else if (width <= 1024) {
          zoomLevel = 0.9; // Pantallas medianas
        } else {
          zoomLevel = 1; // Pantallas grandes
        }

        container.css('zoom', zoomLevel);
      };

      // Ajustar zoom al cargar y al redimensionar la ventana
      adjustZoom();
      window.addEventListener('resize', adjustZoom);

      container.orgchart({
        data: datasource,
        nodeContent: 'title',
        createNode: function ($node, data) {
          $node.addClass('org-chart-node');
          $node.css({
            borderColor: '#4ECCA3',
            backgroundColor: '#2D2F36',
            color: '#F5F5F5',
          });
          $node.hover(
            function () {
              $(this).css({
                backgroundColor: '#4ECCA3',
                color: '#1C1E26',
              });
            },
            function () {
              $(this).css({
                backgroundColor: '#2D2F36',
                color: '#F5F5F5',
              });
            }
          );

          if (data.foto) {
            $node.prepend(
              `<img src="http://localhost:8000${data.foto}" class="node-photo" alt="${data.name}" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 5px;" />`
            );
          }
        },
        render: function () {
          $('.orgchart .lines').css('border-color', '#4ECCA3');
          $('.orgchart .topEdge, .orgchart .bottomEdge, .orgchart .rightEdge, .orgchart .leftEdge').css({
            borderColor: '#4ECCA3',
            backgroundColor: '#4ECCA3',
          });
          $('path').css('stroke', '#4ECCA3');

          container.find('.children').hide();
          container.find('.node').click(function (event) {
            const $node = $(this);
            const $children = $node.find('.children');
            const $icon = $node.find('.expand-collapse-icon');

            if ($children.length > 0) {
              $children.toggle();
              if ($children.is(':visible')) {
                $icon.text('-');
              }
            }
            event.stopPropagation();
          });

          container.find('.node').first().find('.children').hide();
        },
      });

      // Limpiar event listener al desmontar
      return () => {
        window.removeEventListener('resize', adjustZoom);
      };
    }
  }, [datasource]);

  const transformData = (data) => {
    return {
      name: `${data.nombre} ${data.apellido_1} ${data.apellido_2}`,
      title: data.rol.nombre,
      foto: data.foto,
      children: data.children ? data.children.map(transformData) : [],
      collapsed: true,
    };
  };

  return (
    <div id="chart-container" className="org-chart-container">
      {!datasource && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Organigrama;
