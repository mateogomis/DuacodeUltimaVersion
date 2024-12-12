import React, { useEffect, useState } from "react";
import "./Salas.css";
import axios from "axios";

const Salas = ({ showButton = true }) => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = [
    "#ff6f6ffb", "#90ee90", "#add8e6", "#F7CAC9", "#be87eb",
    "#ffb6c1", "#87ceeb", "#87ebb9", "#98eb87", "#EFC050",
  ];

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/sedes/salas/"
        );
        setSalas(response.data);
      } catch (error) {
        setError("Error al obtener las salas");
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);

  useEffect(() => {
    if (!loading && salas.length > 0) {
      const cards = document.querySelectorAll(".salas-card");
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("visible");
        }, index * 200); // Aplica un retraso escalonado
      });
    }
  }, [loading, salas]);

  const generateMapsUrl = (direccion) => {
    const encodedAddress = encodeURIComponent(direccion);
    return `https://www.google.com/maps?q=${encodedAddress}`;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <section className="salas-section">
      <h2 className="salas-section-title">Salas</h2>
      <div className="salas-cards">
        {salas.map((sala, index) => (
          <div
            className="salas-card"
            key={sala.id}
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <div className="salas-header">
              <h3 className="salas-name">{sala.nombre}</h3>
              <a
                href={generateMapsUrl(sala.sede.direccion)}
                target="_blank"
                rel="noopener noreferrer"
                className="salas-map-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4" />
                </svg>
              </a>
            </div>
            <div className="salas-image-container">
              <img
                src={`http://localhost:8000${sala.imagen_url}`}
                alt={sala.nombre}
                className="salas-image"
              />
            </div>
            <p className="salas-info">
              <strong>Capacidad: </strong>
              {sala.capacidad} personas
            </p>
            <p className="salas-info">
              <strong>Sede:</strong> {sala.sede.nombre}
            </p>
            <p className="salas-info">
              <strong>Ubicación:</strong> {sala.sede.direccion}
            </p>
          </div>
        ))}
      </div>
     
    </section>
  );
};

export default Salas;
