import React, { useEffect, useState } from "react";
import "./Protocolos.css";
import FileUpload from "../../components/FileUpload";

const Protocolos = () => {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    const fetchProtocolos = async () => {
      try {
        const response = await fetch("http://localhost:8000/upload/");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        const parsedProtocolos = data.map((item) => ({
          nombre: item.titulo || "Sin título",
          descripcion: item.descripcion || "Sin descripción",
          fecha: new Date(item.uploaded_at).toLocaleDateString(),
          fileUrl: `http://localhost:8000/media/${item.file_name}`,
        }));
        setProtocolos(parsedProtocolos);
      } catch (error) {
        setError("Error al obtener los protocolos. Intenta nuevamente.");
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
        nombre: newFile.titulo || "Nuevo archivo",
        descripcion: newFile.descripcion || "Sin descripción",
        fecha: new Date().toLocaleDateString(),
        fileUrl: `http://localhost:8000/media/${newFile.file_name}`,
      },
    ]);
  };

  return (
    <section className="protocols-section">
      <h2 className="protocols-title">Protocolos de la Empresa</h2>
      <div className="protocols-container">
        {protocolos.length > 0 ? (
          protocolos.map((protocolo, index) => (
            <a
              key={index}
              href={protocolo.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="protocol-circle"
            >
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
            </a>
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
