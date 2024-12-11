import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';
import './Calendario.css';

const Calendario = ({ showButton = true }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sedes, setSedes] = useState([]); // Estado para las sedes
  const [rooms, setRooms] = useState([]); // Estado para las salas
  const [selectedSede, setSelectedSede] = useState(null); // Sede seleccionada
  const [selectedRoom, setSelectedRoom] = useState(null); // Sala seleccionada

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

  // Cargar la lista de sedes
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/sedes/sedes/');
        if (!response.ok) {
          throw new Error('Error al obtener las sedes');
        }
        const data = await response.json();
        setSedes(data);
      } catch (err) {
        console.error('Error al cargar sedes:', err);
        setError('No se pudieron cargar las sedes. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, []);

  // Cargar la lista de salas dependiendo de la sede seleccionada
  useEffect(() => {
    const fetchRooms = async () => {
      if (!selectedSede) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/sedes/salas/?sede=${selectedSede}`);
        if (!response.ok) {
          throw new Error('Error al obtener las salas');
        }
        const data = await response.json();
        // Filtra las salas para mostrar solo las de la sede seleccionada
        const filteredRooms = data.filter(room => room.sede.id === selectedSede);
        setRooms(filteredRooms);
      } catch (err) {
        console.error('Error al cargar salas:', err);
        setError('No se pudieron cargar las salas. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [selectedSede]);

  // Cargar eventos de la sala seleccionada
  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedRoom) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/sedes/salas/${selectedRoom}/`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setEvents(formatEvents(data.reservas));
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setError('No se pudieron cargar las reservas. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedRoom]);

  const handleEventClick = (event) => {
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
      <div className="sede-selector">
        <p>Selecciona una sede:</p>
        {sedes.map((sede) => (
          <div key={sede.id}>
            <input
              type="radio"
              id={`sede-${sede.id}`}
              name="sede"
              value={sede.id}
              checked={selectedSede === sede.id}
              onChange={() => setSelectedSede(sede.id)}
            />
            <label htmlFor={`sede-${sede.id}`}>{sede.nombre}</label>
          </div>
        ))}
      </div>

      {selectedSede && (
        <div className="room-selector">
          <label htmlFor="room">Selecciona una sala:</label>
          <select
            id="room"
            value={selectedRoom || ''}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="" disabled>Selecciona una sala</option>
            {rooms.length > 0 && rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.nombre}</option>
            ))}
          </select>
        </div>
      )}

      {selectedRoom ? (
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
      ) : (
        <p>Por favor, selecciona una sala para ver su calendario.</p>
      )}

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
      
      {showButton && (
        <button
          className="inicio"
          onClick={() => (window.location.href = "/")}
        >
          Inicio
        </button>
      )}
    </div>
  );
};

export default Calendario;
