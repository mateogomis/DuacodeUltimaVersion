import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proyectos.css";

const Proyectos = ({ limite }) => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEmpleados, setMostrarEmpleados] = useState({}); // Estado para controlar qué empleados se muestran

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

  const toggleEmpleados = (proyectoId) => {
    setMostrarEmpleados((prev) => ({
      ...prev,
      [proyectoId]: !prev[proyectoId], // Alternar visibilidad para el proyecto específico
    }));
  };

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

            {/* Botón para mostrar/ocultar empleados */}
            <button
              className="mostrar-empleados-btn"
              onClick={() => toggleEmpleados(proyecto.id)}
            >
              {mostrarEmpleados[proyecto.id] ? "Ocultar Empleados" : "Mostrar Empleados"}
            </button>

            {/* Renderizar empleados si están visibles */}
            {mostrarEmpleados[proyecto.id] && (
              <div className="empleados-container">
                <h4>Empleados Asignados:</h4>
                {proyecto.empleados.length > 0 ? (
                  <ul className="empleados-lista">
                    {proyecto.empleados.map((empleado) => (
                      <li key={empleado.id} className="empleado-item">
                        <div className="empleado-info">
                          <img
                            src={`http://localhost:8000/media/${empleado.foto}`}
                            alt={empleado.nombre}
                            className="empleado-foto"
                          />
                          <div>
                            <p>
                            <u><strong>{`${empleado.nombre} ${empleado.apellido_1} ${empleado.apellido_2}`}</strong></u>
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
