import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';
import './TestCalendario.css';

const TestCalendario = () => {
  const [events, setEvents] = useState([]); // Estado para los eventos
  const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para formatear los datos de la API
  const formatEvents = (reservas) => {
    return reservas.map((reserva) => ({
      start: new Date(`${reserva.fecha}T${reserva.hora_inicio}`),
      end: new Date(`${reserva.fecha}T${reserva.hora_fin}`),
      title: reserva.reservado_por,
      empleados: reserva.empleados_asistentes
        .map((empleado) => `${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`)
        .join(', '),
      motivo: reserva.motivo,
    }));
  };

  // Llamada a la API para obtener los datos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sedes/salas/1/'); // Ajusta la URL de tu API
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setEvents(formatEvents(data.reservas)); // Actualiza los eventos con los datos formateados
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setError('No se pudieron cargar las reservas. Intenta nuevamente.');
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    console.log('Evento seleccionado:', event);
    setSelectedEvent(event);
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recargar Página</button>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <Calendar
        events={events}
        views={['month', 'week', 'day']}
        defaultView="month"
        localizer={momentLocalizer(moment)}
        step={30}
        timeslots={1}
        onSelectEvent={handleEventClick}
        className="calendar"
      />

      {/* Modal para mostrar información del evento */}
      <Modal
        isVisible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div>
            <h2>Detalles del Evento</h2>
            <p><strong>Reservado por:</strong> {selectedEvent.title}</p>
            <p><strong>Fecha:</strong> {selectedEvent.start.toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {selectedEvent.start.toLocaleTimeString()} - {selectedEvent.end.toLocaleTimeString()}</p>
            <p><strong>Asistentes:</strong> {selectedEvent.empleados}</p>
            <p><strong>Motivo:</strong> {selectedEvent.motivo}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TestCalendario;
