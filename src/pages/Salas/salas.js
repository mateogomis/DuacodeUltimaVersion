import React, { useEffect, useState } from "react";
import "./Salas.css";
import axios from "axios";

const Salas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Sustituye con tu propia API Key de Google Maps

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

  // Función para obtener las coordenadas de Google Maps usando la API de geocodificación
  const getCoordinates = async (direccion) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${API_KEY}`
      );
      const data = response.data;
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return `${location.lat},${location.lng}`; // Devuelve latitud y longitud
      }
      return null;
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  };

  // Generar el enlace de Google Maps
  const generateMapsUrl = (direccion) => {
    const coordinates = getCoordinates(direccion); 
    if (coordinates) {
      return `https://www.google.com/maps?q=${coordinates}`;
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(direccion)}`;
  };

  if (loading) return <p>Cargando salas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="salas-section">
      <h2 className="salas-section-title">Salas</h2>
      <div className="salas-cards">
        {salas.map((sala) => (
          <div className="salas-card" key={sala.id}>
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
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
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
