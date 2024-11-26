import React, { useEffect, useState } from "react";
import axios from "axios";
const Eventos = () => {
  const [eventos, setEventos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const companyInfo = [
    {
      title: "Evento de Innovación",
      description: "Explora las últimas tendencias en tecnología e innovación.",
      level: "Avanzado",
      levelColor: "#DC3545",
    },
    {
      title: "Conferencia de Software",
      description:
        "Descubre herramientas y prácticas modernas para desarrolladores.",
      level: "Intermedio",
      levelColor: "#FFC107",
    },
    {
      title: "Taller de Diseño UX",
      description:
        "Aprende cómo mejorar la experiencia de usuario con expertos.",
      level: "Principiante",
      levelColor: "#28A745",
    },
  ];
  // useEffect(() => {
  //   const fetchEventos = async () => {
  //     try {
  //       const response = await axios.get("");
  //       setEventos(response.data);
  //     } catch (error) {
  //       setError("Error al obtener los eventos");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchEventos();
  // }, []);
  // if (loading) return <p>Cargando eventos...</p>;
  // if (error) return <p>{error}</p>;
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
