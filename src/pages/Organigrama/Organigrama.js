import React, { useState, useEffect } from 'react';
import OrgChart from 'react-orgchart';  // Importar la librería
import 'react-orgchart/index.css';      // Importar los estilos de la librería
import './Organigrama.css'; // Archivo de estilos

// Componente para los nodos
const MyNodeComponent = ({ node, onClick }) => {
  return (
    <div className="initechNode" onClick={onClick}>
      {node.rol.nombre} <br />
      {node.apellido_1}
      <img src={`http://localhost:8000${node.foto}`} alt={node.nombre} className="node-photo" />
    </div>
  );
};

const Organigrama = () => {
  const [datos, setDatos] = useState(null); // Usar estado para manejar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Fetch de los datos de la API
  useEffect(() => {
    fetch('http://localhost:8000/api/organigrama')
      .then((response) => response.json())  // Parsear la respuesta JSON
      .then((data) => {
        console.log(data[0]);  // Mostrar los datos en la consola
        setDatos(data[0]);  // Guardar los datos en el estado
        setLoading(false);  // Cambiar el estado de carga a falso
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);  // Cambiar el estado de carga a falso en caso de error
      });
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Mostrar un mensaje mientras se cargan los datos
  if (loading) {
    return <div>Cargando datos del organigrama...</div>;
  }

  // Formatear los datos para incluir la funcionalidad de expansión
  const formatTreeData = (data) => {
    if (data && data.children) {
      return {
        ...data,
        children: data.children.map(formatTreeData) // Recursivamente formatear los hijos
      };
    }
    return data; // Si no tiene hijos, devolver el nodo tal cual
  };

  // Función para manejar el clic en un nodo y mostrar/ocultar los hijos
  const handleNodeClick = (node) => {
    node.showChildren = !node.showChildren; // Alternar visibilidad de los hijos
    setDatos({...datos}); // Forzar la re-renderización del organigrama
  };

  // Mostrar el organigrama una vez que los datos estén disponibles
  const renderNode = (node) => {
    return (
      <div className="initechNode" key={node.id}>
        <MyNodeComponent node={node} onClick={() => handleNodeClick(node)} />
        {node.showChildren && node.children && node.children.length > 0 && (
          <div className="children-container">
            <div className="left-right-container">
              {node.children.map((child, index) => (
                <div className="child-node" key={child.id}>
                  {renderNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Bienvenido al Organigrama</h1>
      {datos && (
        <div className="org-chart-container">
          {renderNode(datos)}
        </div>
      )}
    </div>
  );
};

export default Organigrama;
