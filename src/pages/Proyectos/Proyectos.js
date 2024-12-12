import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Proyectos.css";

const Proyectos = ({ limite, showButton = true }) => {
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

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
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
      {showButton && (
        <button className="inicio" onClick={() => (window.location.href = "/")}>
          Inicio
        </button>
      )}
    </section>
  );
};

export default Proyectos;
/**
 * Componente Proyectos
 * 
 * Este componente muestra una lista de proyectos de la empresa. Permite cargar y mostrar los proyectos desde una API externa y proporciona opciones para expandir detalles específicos de cada proyecto, incluyendo la lista de empleados asignados.
 * 
 * Props:
 * - `limite` (opcional, número): Limita el número de proyectos mostrados en la vista.
 * - `showButton` (opcional, booleano): Muestra un botón de "Inicio" si se pasa como true.
 * 
 * Estado:
 * - `proyectos`: Arreglo de proyectos cargados para mostrar.
 * - `loading`: Estado de carga para mostrar un indicador mientras se obtienen los datos.
 * - `error`: Mensaje de error en caso de que ocurra algún problema al cargar los datos.
 * - `mostrarEmpleadoId`: ID del proyecto actualmente expandido para mostrar los empleados.
 * 
 * Métodos:
 * - `fetchProyectos()`: Realiza una solicitud HTTP para cargar los proyectos disponibles.
 * - `toggleEmpleados(proyectoId)`: Cambia el estado del proyecto expandido para mostrar/ocultar los empleados asignados.
 * 
 * UI:
 * - El componente muestra una lista de proyectos con detalles básicos.
 * - Permite expandir proyectos para ver detalles adicionales, como empleados asignados.
 * - Los empleados asignados se muestran con su información básica, incluida la foto.
 * - Si ocurre un error al cargar datos, se muestra un mensaje de error.
 * 
 * Estilos:
 * - `Proyectos.css` se utiliza para personalizar la apariencia de los proyectos y sus elementos.
 */
