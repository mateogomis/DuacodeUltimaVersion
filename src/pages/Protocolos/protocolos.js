import React, { useState, useEffect } from 'react';
import './ProtocolosHome.css'; // Importa el nuevo CSS

const Protocolos = () => {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtocolos = async () => {
      try {
        const response = await fetch('http://localhost:8000/upload/');
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();
        const parsedProtocolos = data.map((item) => ({
          nombre: item.titulo || 'Sin título',
          descripcion: item.descripcion || 'Sin descripción',
          fecha: new Date(item.uploaded_at).toLocaleDateString(),
          fileUrl: `http://localhost:8000/media/${item.file_name}`,
        }));
        setProtocolos(parsedProtocolos);
      } catch (error) {
        setError('Error al obtener los protocolos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProtocolos();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="protocols-home-wrapper">
      <h2 className="protocols-title">Listado de Protocolos</h2> {/* Título arriba */}
      <div className="protocols-home-container">
        {protocolos.length > 0 ? (
          protocolos.map((protocolo, index) => (
            <a
              key={index}
              href={protocolo.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="protocol-home-circle"
            >
              <div className="protocol-content">
                <span className="protocol-icon">
                </span>
                <h3 className="protocol-name">{protocolo.nombre}</h3>
              </div>
              <p className="protocol-home-description">{protocolo.descripcion}</p>
            </a>
          ))
        ) : (
          <p>No se encontraron protocolos.</p>
        )}
      </div>
    </div>
  );
};

export default Protocolos;
