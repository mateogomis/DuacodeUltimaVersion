import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Librería del calendario
import axios from "axios";
import "./Calendario.css";
const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const simulatedEvents = [
      { title: "Evento A", date: "2024-11-22" },
      { title: "Evento B", date: "2024-11-23" },
    ];

    const formattedDate = date.toISOString().split("T")[0];
    const filteredEvents = simulatedEvents.filter(
      (event) => event.date === formattedDate
    );
    setEventsForDate(filteredEvents);
  };

  return (
    <section className="calendar-section">
      <h2 className="calendar-title">Calendario Informativo</h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="custom-calendar"
        />
        <div className="calendar-events">
          <h3>Eventos para {selectedDate.toDateString()}</h3>
          {eventsForDate.length > 0 ? (
            eventsForDate.map((event, idx) => <p key={idx}>{event.title}</p>)
          ) : (
            <p>Sin eventos</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default Calendario;