import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Empleados.css";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/empleados/"
        );
        setEmpleados(response.data);
        setFilteredEmpleados(response.data);
      } catch (error) {
        setError("Error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = empleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(query)
    );
    setFilteredEmpleados(filtered);
  };

  const toggleInfo = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="employee-section">
      <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
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
                <img
                  src={`http://localhost:8000/media/${empleado.foto}`}
                  alt={empleado.nombre}
                  className="employee-image"
                />
              </div>
              <h3 className="employee-name">
                {empleado.nombre} {empleado.apellido_1} {empleado.apellido_2}
              </h3>
              <button
                className="expand-button"
                onClick={() => toggleInfo(empleado.id)}
              >
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
                    <strong>Cumpleaños:</strong> {empleado.cumpleanos}
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
