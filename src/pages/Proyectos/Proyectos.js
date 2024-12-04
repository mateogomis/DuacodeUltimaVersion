import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proyectos.css";

const Proyectos = ({ limite }) => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/proyectos/"
        );
        setProyectos(response.data);
      } catch (error) {
        setError("Error al obtener los proyectos");
      } finally {
        setLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  const proyectosAMostrar = limite ? proyectos.slice(0, limite) : proyectos;

  return (
    <section className="proyecto-section">
      <h2 className="proyecto-titulo">Proyectos de la Empresa</h2>
      <div className="proyecto-cards">
        {proyectosAMostrar.map((proyecto) => (
          <div className="proyecto-card" key={proyecto.id}>
            <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
            <p>
              <strong>Descripción:</strong> {proyecto.descripcion}
            </p>
            <p>
              <strong>Fecha de Inicio:</strong> {proyecto.fecha_inicio}
            </p>
            <p>
              <strong>Fecha de Fin:</strong> {proyecto.fecha_fin || "En curso"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
