import React, { useEffect, useState } from "react";
import "./Protocolos.css";
import axios from "axios";
import FileUpload from "../../components/FileUpload";

const Protocolos = () => {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado

  useEffect(() => {
    // Simula verificar si el usuario está autenticado
    const checkAuthentication = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token); // Verifica si hay un token presente
    };

    const fetchProtocolos = async () => {
      try {
        // Aquí se define protocolo.nombre
        const protocolo = await axios.get('http://localhost:8000/media/some-protocol-name', {
          responseType: "text",
        });
        const parser = new DOMParser();
        const doc = parser.parseFromString(protocolo.data, "text/html");
        const items = [...doc.querySelectorAll("ul li")];

        const data = items.map((item) => {
          const nombre = item
            .querySelector("strong:nth-of-type(1)")
            ?.nextSibling?.textContent?.trim();
          const descripcion = item
            .querySelector("strong:nth-of-type(2)")
            ?.nextSibling?.textContent?.trim();
          const fecha = item
            .querySelector("strong:nth-of-type(3)")
            ?.nextSibling?.textContent?.trim();

          return { nombre, descripcion, fecha };
        });

        setProtocolos(data);
      } catch (error) {
        setError("Error al obtener los protocolos");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
    fetchProtocolos();
  }, []);

  if (loading) return <p>Cargando protocolos...</p>;
  if (error) return <p className="error">{error}</p>;

  const handleFileUploadSuccess = (newFile) => {
    setProtocolos((prevProtocolos) => [
      ...prevProtocolos,
      {
        titulo: newFile.name,
        descripcion: newFile.descripcion || "",
      },
    ]);
  };

  return (
    <section className="protocols-section">
      <h2 className="protocols-title">Protocolos de la Empresa</h2>
      <div className="protocols-container">
        {protocolos.length > 0 ? (
          protocolos.map((protocolo, index) => (
            <div key={index} className="protocol-circle">
              <div className="protocol-content">
                <span className="protocol-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="bi bi-file-earmark-text"
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
                <h3 className="protocol-name">{protocolo.nombre}</h3>
              </div>
              <p className="protocol-description">{protocolo.descripcion}</p>
              <p className="protocol-date">{protocolo.fecha}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron protocolos.</p>
        )}
      </div>
      {isAuthenticated && (
        <FileUpload onFileUploadSuccess={handleFileUploadSuccess} />
      )}
    </section>
  );
};

export default Protocolos;
