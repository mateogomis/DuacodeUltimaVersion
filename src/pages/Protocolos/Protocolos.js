import React, { useState, useEffect } from "react";
import "./ProtocolosHome.css"; // Importa el nuevo CSS

const Protocolos = () => {
  const [protocolos, setProtocolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      <h2 className="protocols-title">Listado de Protocolos</h2>{" "}
      {/* Título arriba */}
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
                <span className="protocol-icon"></span>
                <h3 className="protocol-name">{protocolo.nombre}</h3>
              </div>
              <p className="protocol-home-description">
                {protocolo.descripcion}
              </p>
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
/**
 * Componente Protocolos
 *
 * Este componente muestra una lista de protocolos obtenidos de un servidor.
 * Los datos se cargan desde una API usando una solicitud GET y se formatean para mostrar
 * información como el nombre, descripción y fecha de cada protocolo. Los archivos se
 * pueden visualizar haciendo clic en el enlace correspondiente.
 *
 * Estados:
 * - `protocolos`: Almacena los protocolos cargados desde el servidor.
 * - `loading`: Indica si los datos están siendo cargados.
 * - `error`: Almacena mensajes de error si ocurre algún problema al cargar los datos.
 *
 * Efectos:
 * - `useEffect(() => { ... })`: Realiza una solicitud a la API para obtener los protocolos y
 * actualiza el estado `protocolos` con los datos obtenidos. En caso de error, muestra un mensaje
 * y finalmente cambia el estado de `loading` a `false`.
 *
 * UI:
 * - Mientras se cargan los datos, se muestra un cargador.
 * - En caso de error, se muestra un mensaje de error.
 * - Los protocolos se muestran en un formato de tarjeta con nombre, descripción y fecha.
 * - Cada tarjeta de protocolo contiene un enlace para descargar el archivo correspondiente.
 *
 * El CSS utilizado (`ProtocolosHome.css`) es necesario para darle estilo a los elementos.
 */
