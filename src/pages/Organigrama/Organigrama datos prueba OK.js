import React, { useEffect } from 'react';
import $ from 'jquery'; // Importa jQuery
// import 'https://cdnjs.cloudflare.com/ajax/libs/orgchart/2.1.9/js/jquery.orgchart.min.js'; // Asegúrate de que orgchart.js se cargue después de jQuery


const Organigrama = () => {
  useEffect(() => {
    // Espera que jQuery y orgchart.js estén cargados
    if (typeof $ !== 'undefined' && typeof $.fn.orgchart !== 'undefined') {
      const datasource = {
        name: 'Lao Lao',
        title: 'general manager',
        children: [
          {
            name: 'Bo Miao',
            title: 'department manager',
            compact: true,
            children: [
              { name: 'Fei Xuan', title: 'engineer' },
              { name: 'Er Xuan', title: 'engineer' },
              { name: 'San Xuan', title: 'engineer' },
              {
                name: 'Si Xuan',
                title: 'engineer',
                compact: true,
                children: [
                  { name: 'Feng Shou', title: 'engineer' },
                  { name: 'Er Shou', title: 'engineer' },
                  { name: 'San Shou', title: 'engineer' },
                  { name: 'Si Shou', title: 'engineer' },
                ],
              },
              { name: 'Wu Xuan', title: 'engineer' },
            ],
          },
          {
            name: 'Su Miao',
            title: 'department manager',
            children: [
              { name: 'Tie Hua', title: 'senior engineer' },
              {
                name: 'Hei Hei',
                title: 'senior engineer',
                children: [
                  { name: 'Dan Dan', title: 'engineer' },
                  { name: 'Er Dan', title: 'engineer' },
                  { name: 'San Dan', title: 'engineer' },
                  { name: 'Si Dan', title: 'engineer' },
                  { name: 'Wu Dan', title: 'engineer' },
                  { name: 'Liu Dan', title: 'engineer' },
                  { name: 'Qi Dan', title: 'engineer' },
                  { name: 'Ba Dan', title: 'engineer' },
                  { name: 'Jiu Dan', title: 'engineer' },
                  { name: 'Shi Dan', title: 'engineer' },
                ],
              },
              { name: 'Pang Pang', title: 'senior engineer' },
            ],
          },
          { name: 'Hong Miao', title: 'department manager' },
        ],
      };

      // Inicializa orgchart una vez que jQuery esté listo
      $('#chart-container').orgchart({
        data: datasource,
        nodeContent: 'title',
        compact: function (data) {
          return data?.children?.length >= 10;
        },
      });
    } else {
      console.log(typeof jQuery);
console.log(typeof $.fn.orgchart);
    }
  }, []);

  return (
    <div
      id="chart-container"
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #ddd',
      }}
    ></div>
  );
};

export default Organigrama;
