import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TestCalendario.css';
import './loader.css';

const TestCalendario = () => {
  const [events, setEvents] = useState([]); // Estado para los eventos del calendario
  const [loading, setLoading] = useState(true); // Estado para la carga de datos
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado

  // Función para convertir los datos al formato de react-big-calendar
  const formatData = (reservas) => {
    return reservas.map(event => {
      const startDate = new Date(`${event.fecha}T${event.hora_inicio}`);
      const endDate = new Date(`${event.fecha}T${event.hora_fin}`);

      const empleadosAsistentes = event.empleados_asistentes
        .map(empleado => `${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`)
        .join(', ');

      return {
        start: startDate,
        end: endDate,
        title: `Reserva: ${event.reservado_por}`,
        empleados: empleadosAsistentes,
        motivo: event.motivo,
        allDay: false,
      };
    });
  };

  // Cargar los eventos cuando el componente se monta
  useEffect(() => {
    fetch('http://localhost:8000/api/sedes/salas/1/')
      .then(response => response.json())
      .then(data => {
        const formattedEvents = formatData(data.reservas);
        console.log(data);
        setEvents(formattedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar las reservas:', error);
        setLoading(false);
      });
  }, []);

  // Carga animación de carga mientras consulta a la base de datos
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        events={events}
        views={['month', 'week', 'day']}
        defaultView='month'
        localizer={momentLocalizer(moment)}
        step={30}
        timeslots={1}
        onSelectEvent={(event) => setSelectedEvent(event)} // Manejar clic en evento
        components={{
          event: ({ event }) => (
            <div>
              <div style={{ color: 'orange', fontWeight: 'bold' }}>
                {event.title}
              </div>
              <div style={{ fontSize: '0.9em', color: 'white' }}>
                <strong>Asistentes:</strong><br />
                {event.empleados}
                <br />
                <strong>Motivo:</strong><br />
                <em>{event.motivo}</em>
              </div>
            </div>
          ),
        }}
      />

      {/* Modal para mostrar información del evento */}
      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedEvent(null)}>&times;</span>
            <h2>Detalles de la Reserva</h2>
            <p><strong>Reservado por:</strong> {selectedEvent.title}</p>
            <p><strong>Fecha:</strong> {selectedEvent.start.toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {selectedEvent.start.toLocaleTimeString()} - {selectedEvent.end.toLocaleTimeString()}</p>
            <p><strong>Asistentes:</strong> {selectedEvent.empleados}</p>
            <p><strong>Motivo:</strong> {selectedEvent.motivo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCalendario;
