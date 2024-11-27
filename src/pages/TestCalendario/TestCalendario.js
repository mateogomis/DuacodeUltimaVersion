// MyCalendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'; // Asegúrate de importar Calendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TestCalendario.css'
const TestCalendario = () => {
  const [events, setEvents] = useState([]); // Estado para los eventos del calendario
  const [loading, setLoading] = useState(true); // Estado para la carga de datos

  // Ejemplo de datos de citas (pueden ser de una API)
  const data = [
    {
      "id": 1,
      "sala": 6,
      "reservado_por": "Alejandro Blanco Robinson",
      "fecha": "2024-11-28",
      "hora_inicio": "11:00:00",
      "hora_fin": "12:00:00",
      "empleados_asistentes": [
        {
          "id": 96,
          "nombre": "Ines",
          "apellido_1": "Olsrud",
          "apellido_2": "Austin",
          "email": "ines.olsrud@example.com"
        },
        {
          "id": 134,
          "nombre": "Lison",
          "apellido_1": "Henry",
          "apellido_2": "Campbell",
          "email": "lison.henry@example.com"
        }
      ]
    }
  ];

  // Función para convertir los datos al formato de react-big-calendar
  const formatData = (data) => {
    return data.map(event => {
      const startDate = new Date(`${event.fecha}T${event.hora_inicio}`);
      const endDate = new Date(`${event.fecha}T${event.hora_fin}`);

      return {
        start: startDate,
        end: endDate,
        title: `Reservado por: ${event.reservado_por}`,
        resource: event.empleados_asistentes, // Puedes usar esto para mostrar información adicional
        allDay: false,
      };
    });
  };

  // Cargar los eventos cuando el componente se monta
  useEffect(() => {
    const formattedEvents = formatData(data); // Formatear los datos
    setEvents(formattedEvents); // Guardar los eventos en el estado
    setLoading(false); // Cambiar el estado de carga
  }, [data]);

  // Mostrar el mensaje de carga si aún no se han cargado los eventos
  if (loading) {
    return <div>Cargando el calendario...</div>;
  }

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        events={events} // Los eventos que se van a mostrar
        views={['month', 'week', 'day']} // Las vistas disponibles (mes, semana, día)
        defaultView='month' // Vista predeterminada
        localizer={momentLocalizer(moment)} // Localizador con moment.js
        step={30} // Intervalo de 30 minutos por slot
        timeslots={1} // Cantidad de intervalos de tiempo por día
      />
    </div>
  );
};

export default TestCalendario;
