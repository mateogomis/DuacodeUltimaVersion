import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proyectos.css";

const Proyectos = ({ limite }) => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEmpleadoId, setMostrarEmpleadoId] = useState(null); // Único ID expandido

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

  if (loading) return <p className="loading">Cargando proyectos...</p>;
  if (error) return <p className="error">{error}</p>;

  const proyectosAMostrar = limite ? proyectos.slice(0, limite) : proyectos;

  const toggleEmpleados = (proyectoId) => {
    setMostrarEmpleadoId((prevId) => (prevId === proyectoId ? null : proyectoId));
  };

  return (
    <section className="proyecto-section">
      <h2 className="proyecto-titulo">Proyectos de la Empresa</h2>
      <div className="proyecto-cards">
        {proyectosAMostrar.map((proyecto) => (
          <div
            className={`proyecto-card ${
              mostrarEmpleadoId === proyecto.id ? "expandido" : ""
            }`}
            key={proyecto.id}
          >
            <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
            <p className="proyecto-descripcion">
              <strong>Descripción:</strong> {proyecto.descripcion}
            </p>
            <p>
              <strong>Fecha de Inicio:</strong> {proyecto.fecha_inicio}
            </p>
            <p>
              <strong>Fecha de Fin:</strong> {proyecto.fecha_fin || "En curso"}
            </p>

            <button
              className="mostrar-empleados-btn"
              onClick={() => toggleEmpleados(proyecto.id)}
            >
              {mostrarEmpleadoId === proyecto.id ? "Ocultar Empleados" : "Mostrar Empleados"}
            </button>

            {mostrarEmpleadoId === proyecto.id && (
              <div className="empleados-container">
                <h4 className="empleados-titulo">Empleados Asignados:</h4>
                {proyecto.empleados.length > 0 ? (
                  <ul className="empleados-lista">
                    {proyecto.empleados.map((empleado) => (
                      <li key={empleado.id} className="empleado-item">
                        <img
                          src={`http://localhost:8000/media/${empleado.foto}`}
                          alt={empleado.nombre}
                          className="empleado-foto"
                        />
                        <div className="empleado-info">
                          <p className="empleado-nombre">
                            <strong>{`${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`}</strong>
                          </p>
                          <p>
                            <strong>Rol:</strong> {empleado.rol.rol_display}
                          </p>
                          <p>
                            <strong>Email:</strong> {empleado.email}
                          </p>
                          <p>
                            <strong>Teléfono:</strong> {empleado.telefono}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay empleados asignados a este proyecto.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
