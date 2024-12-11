import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; // Importar idioma español
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./Modal";
import "./TestCalendario.css";

const TestCalendario = () => {
  moment.locale("es", {
    week: { dow: 1 }, // Lunes como primer día de la semana
  });

  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("1"); // Sala 1 seleccionada por defecto

  const formatEvents = (reservas) => {
    return reservas.map((reserva) => ({
      start: new Date(`${reserva.fecha}T${reserva.hora_inicio}`),
      end: new Date(`${reserva.fecha}T${reserva.hora_fin}`),
      title: reserva.reservado_por,
      empleados: reserva.empleados_asistentes
        .map(
          (empleado) =>
            `${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`
        )
        .join(", "),
      motivo: reserva.motivo,
    }));
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/sedes/salas/");
        if (!response.ok) throw new Error("Error al obtener las salas");
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError("No se pudieron cargar las salas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedRoom) return;
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/sedes/salas/${selectedRoom}/`
        );
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setEvents(formatEvents(data.reservas));
      } catch (err) {
        setError("No se pudieron cargar las reservas. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedRoom]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
    showMore: (total) => `+ Ver más (${total})`,
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Recargar Página</button>
      </div>
    );

  return (
    <div className="calendar-container">
      <div className="room-selector">
        <label htmlFor="room">Selecciona una sala:</label>
        <select
          id="room"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.nombre}
            </option>
          ))}
        </select>
      </div>

      <Calendar
        events={events}
        views={["month", "week", "day"]}
        defaultView="month"
        localizer={localizer}
        messages={messages} // Traducción al español
        startAccessor="start"
        endAccessor="end"
        step={30}
        timeslots={1}
        onSelectEvent={handleEventClick}
        className="calendar"
      />

      <Modal
        isVisible={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div>
            <h2>Detalles del Evento</h2>
            <p>
              <strong>Reservado por:</strong> {selectedEvent.title}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {selectedEvent.start.toLocaleDateString()}
            </p>
            <p>
              <strong>Hora:</strong>{" "}
              {selectedEvent.start.toLocaleTimeString()} -{" "}
              {selectedEvent.end.toLocaleTimeString()}
            </p>
            <p>
              <strong>Asistentes:</strong> {selectedEvent.empleados}
            </p>
            <p>
              <strong>Motivo:</strong> {selectedEvent.motivo}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TestCalendario;
