import React, { useEffect, useState } from "react";
import axios from "axios";
const Eventos = () => {
  const [eventos, setEventos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("");
        setEventos(response.data);
      } catch (error) {
        setError("Error al obtener los eventos");
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);
  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="event-section">
      <h2 className="event-section-title">Información de Eventos</h2>
      <div className="event-cards">
        {companyInfo.map((event, index) => (
          <div className="event-card" key={index}>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-level">
              <span
                className="event-level-indicator"
                style={{ backgroundColor: event.levelColor }}
              ></span>
              {event.level}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Eventos;
