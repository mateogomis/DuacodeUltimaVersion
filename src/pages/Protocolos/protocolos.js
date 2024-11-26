import React, { useEffect, useState } from "react";
import "./Protocolos.css";
import axios from "axios";

const Protocolos = () => {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProtocolos = async () => {
      try {
        const response = await axios.get("");
        setProtocolos(response.data);
      } catch (error) {
        setError("Error al obtener los protocolos");
      } finally {
        setLoading(false);
      }
    };
    fetchProtocolos();
  }, []);
  if (loading) return <p>Cargando protocolos...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="protocols-section">
      <h2 className="protocols-title">Protocolos de la Empresa</h2>
      <div className="protocols-container">
        {/* Acceso Oficina */}
        <div className="protocol-circle">
          <div className="protocol-content">
            <span className="protocol-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-lock"
              >
                <path d="M11.5 8a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7Zm-7-1A1.5 1.5 0 0 0 3 8.5v4A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 11.5 7h-7ZM8 5a2 2 0 0 1 2 2v1H6V7a2 2 0 0 1 2-2Zm0-1a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3Z" />
              </svg>
            </span>
            <h3 className="protocol-name">Acceso Oficina</h3>
          </div>
          <p className="protocol-description">
            Aprende cómo ingresar a las oficinas de manera segura y eficiente.
          </p>
        </div>

        {/* Manuales */}
        <div className="protocol-circle">
          <div className="protocol-content">
            <span className="protocol-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-file-earmark-text"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              </svg>
            </span>
            <h3 className="protocol-name">Manuales</h3>
          </div>
          <p className="protocol-description">
            Consulta los manuales oficiales para conocer nuestras políticas y
            procedimientos.
          </p>
        </div>

        {/* Herramientas */}
        <div className="protocol-circle">
          <div className="protocol-content">
            <span className="protocol-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-tools"
                viewBox="0 0 16 16"
              >
                <path d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814z" />
                <path d="M9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
              </svg>
            </span>
            <h3 className="protocol-name">Herramientas</h3>
          </div>
          <p className="protocol-description">
            Descubre cómo utilizar correctamente las herramientas
            proporcionadas.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Protocolos;
