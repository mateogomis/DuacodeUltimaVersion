import React, { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import axios from 'axios'; // Importa axios

const Salas = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/sedes/salas/"
        );
        console.log(response.data);
        setSalas(response.data);
      } catch (error) {
        setError("Error al obtener las salas");
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);

  if (loading) return <p>Cargando salas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="salas-section">
      <h2 className="salas-section-title">Salas</h2>
      <div className="salas-cards">
        {salas.map((sala) => (
          <div className="salas-card" key={sala.id}>
            <div className="salas-image-container">
              <img src={`http://localhost:8000${sala.imagen_url}`}  alt={sala.nombre} className="salas-image" />
            </div>
            <h3 className="salas-name">{sala.nombre}</h3>
            <p className="salas-info">
              <strong>Capacidad: </strong>
              {sala.capacidad} personas
            </p>
            <p className="salas-info">
              <strong>Sede n.º</strong> {sala.sede.nombre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Salas;
