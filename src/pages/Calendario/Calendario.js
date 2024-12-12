import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Modal';
import './Calendario.css';

moment.locale('es'); // Configura moment.js al idioma español

const Calendario = ({ showButton = true }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sedes, setSedes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const localizer = momentLocalizer(moment); // Localizador configurado con moment.js

  const messages = {
    allDay: 'Todo el día',
    previous: 'Atrás',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango.',
    showMore: (count) => `+ Ver más (${count})`,
  };

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
        const filteredRooms = data.filter(room => room.sede.id === Number(selectedSede));
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

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedRoom) {
        setEvents([]);
        return;
      }

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
      <div className="selectors-container">
        <div className="sede-selector">
          <label htmlFor="sede">Selecciona una sede:</label>
          <select
            id="sede"
            value={selectedSede || ''}
            onChange={(e) => setSelectedSede(e.target.value)}
          >
            <option value="" disabled>Selecciona una sede</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>{sede.nombre}</option>
            ))}
          </select>
        </div>

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
      </div>

      <Calendar
        events={events}
        views={['month', 'week', 'day']}
        defaultView="month"
        localizer={localizer}
        step={30}
        timeslots={1}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        className="calendar"
        culture="es" // Configura el idioma del calendario a español
        messages={messages} // Aplica los mensajes personalizados
        dayLayoutAlgorithm="no-overlap" // Configuración para evitar solapamiento
      />

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

export default Calendario;
/**
 * Componente Calendario
 * 
 * Este componente representa un calendario interactivo que permite visualizar y seleccionar eventos. Utiliza `react-big-calendar` para la visualización del calendario y `moment.js` para la gestión de fechas y horarios.
 * 
 * Props:
 * - `showButton` (opcional, booleano): Muestra un botón de "Inicio" si se pasa como true.
 * 
 * Estado:
 * - `events`: Arreglo de eventos cargados para mostrar en el calendario.
 * - `selectedEvent`: Evento seleccionado actualmente para mostrar en un modal.
 * - `loading`: Estado de carga para mostrar un indicador mientras se obtienen los datos.
 * - `error`: Mensaje de error en caso de que ocurra algún problema al cargar los datos.
 * - `sedes`: Lista de sedes disponibles.
 * - `rooms`: Lista de salas disponibles para la sede seleccionada.
 * - `selectedSede`: Sede seleccionada actualmente.
 * - `selectedRoom`: Sala seleccionada actualmente.
 * 
 * Métodos:
 * - `fetchSedes()`: Realiza una solicitud HTTP para cargar las sedes disponibles.
 * - `fetchRooms()`: Realiza una solicitud HTTP para cargar las salas disponibles según la sede seleccionada.
 * - `fetchEvents()`: Realiza una solicitud HTTP para cargar los eventos de la sala seleccionada.
 * - `handleEventClick(event)`: Maneja el clic en un evento para mostrar sus detalles en un modal.
 * 
 * UI:
 * - El componente muestra un selector de sedes y salas para filtrar los eventos.
 * - Muestra un calendario interactivo donde los eventos están representados.
 * - Los detalles del evento seleccionado se muestran en un modal.
 * - Si ocurre un error al cargar datos, se muestra un mensaje de error y un botón para recargar la página.
 * 
 * Estilos:
 * - `Calendario.css` se utiliza para personalizar la apariencia del calendario y sus elementos.
 */
