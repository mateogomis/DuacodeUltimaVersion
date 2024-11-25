import React, { useEffect, useState } from "react";
import axios from "axios";
import "./calendario.css";
const Calendario = () => {
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
