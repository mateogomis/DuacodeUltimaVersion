import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Empleados.css";

/**
 * Componente para mostrar una lista de empleados con información detallada.
 * Incluye búsqueda, un carrusel interactivo y funcionalidad para expandir detalles.
 */
const Empleados = () => {
  // Estados para manejar los datos de empleados, búsqueda, y estado de la UI
  const [empleados, setEmpleados] = useState([]); // Lista completa de empleados
  const [filteredEmpleados, setFilteredEmpleados] = useState([]); // Lista filtrada según la búsqueda
  const [searchQuery, setSearchQuery] = useState(""); // Consulta de búsqueda del usuario
  const [expandedCards, setExpandedCards] = useState({}); // Controla qué tarjetas están expandidas
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores

  /**
   * Hook de efecto para obtener los datos de empleados al montar el componente.
   */
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/empleados/" // URL para obtener los datos
        );
        setEmpleados(response.data); // Guardar datos en el estado
        setFilteredEmpleados(response.data); // Inicialmente, la lista filtrada es igual a la completa
      } catch (error) {
        setError("Error al obtener los empleados"); // Manejo de errores en la solicitud
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };
    fetchEmpleados();
  }, []);

  /**
   * Lista de nombres de los meses en español para dar formato a fechas.
   */
  const Meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  /**
   * Formato de cumpleaños en un estilo legible.
   * @param {string} birthday - Fecha en formato "DD-MM".
   * @returns {string} Fecha con el mes en texto.
   */
  const FormatoCumple = (birthday) => {
    const [day, month] = birthday.split("-");
    return `${day} de ${Meses[parseInt(month, 10) - 1]}`;
  };

  /**
   * Maneja la búsqueda de empleados por nombre.
   * @param {object} e - Evento de cambio en el campo de búsqueda.
   */
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = empleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(query)
    );
    setFilteredEmpleados(filtered);
  };

  /**
   * Alterna la expansión de detalles para un empleado específico.
   * @param {number} id - ID del empleado.
   */
  const toggleInfo = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Configuración del carrusel (slider)
  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Mostrar indicador de carga o error
  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="employee-section">
      <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar empleado por nombre..."
        value={searchQuery}
        onChange={handleSearch}
        className="employee-search-bar"
      />
      {filteredEmpleados.length === 0 ? (
        <p className="no-employees-message">No existe ese empleado.</p>
      ) : (
        <Slider {...carouselSettings} className="employee-carousel">
          {filteredEmpleados.map((empleado) => (
            <div className="employee-card" key={empleado.id}>
              <div className="employee-image-container">
                {/* Imagen del empleado */}
                <img
                  src={`http://localhost:8000/media/${empleado.foto}`}
                  alt={empleado.nombre}
                  className="employee-image"
                />
              </div>
              {/* Nombre del empleado */}
              <h3 className="employee-name">
                {empleado.nombre} {empleado.apellido_1} {empleado.apellido_2}
              </h3>
              {/* Botón para expandir detalles */}
              <button
                className="expand-button"
                onClick={() => toggleInfo(empleado.id)}
              >
                {/* Icono SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  <path
                    fillRule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </button>
              {/* Detalles expandidos */}
              {expandedCards[empleado.id] && (
                <div className="employee-info-expanded">
                  <p>
                    <strong>Estado: </strong>
                    {(() => {
                      if (
                        empleado.baja === false &&
                        empleado.excedencia === false &&
                        empleado.vacaciones === false &&
                        empleado.teletrabajo === false
                      ) {
                        return "Está trabajando";
                      } else if (empleado.teletrabajo === true) {
                        return "Está teletrabajando";
                      } else {
                        return "No está trabajando";
                      }
                    })()}
                  </p>
                  <p>
                    <strong>Cumpleaños:</strong> {FormatoCumple(empleado.cumpleanos.substring(0, 5))}
                  </p>
                  <p>
                    <strong>Contratación:</strong> {empleado.fecha_contratacion}
                  </p>
                  <p>
                    <strong>Correo:</strong> {empleado.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {empleado.telefono}
                  </p>
                  <p>
                    <strong>Oficina:</strong> {empleado.sede.nombre || "No asignada"}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {empleado.sede.direccion || "No disponible"}
                  </p>
                  <p>
                    <strong>Supervisor:</strong> {empleado.supervisor}
                  </p>
                  <p>
                    <strong>Puesto:</strong> {empleado.rol.rol_display}
                  </p>
                  <p>
                    <strong>Vacaciones: </strong>
                    {empleado.vacaciones
                      ? "Está de vacaciones"
                      : "No está de vacaciones"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Empleados;
