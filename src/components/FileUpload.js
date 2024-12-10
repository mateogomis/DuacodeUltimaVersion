import React, { useState } from 'react';
import "../components/FileUpload.css";

// Función para obtener el valor de la cookie por nombre
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const FileUpload = ({ onFileUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titulo) {
      setError('El título es obligatorio.');
      return;
    }

    if (!file) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);

    // Obtener el token CSRF de las cookies
    const csrfToken = getCookie('csrftoken'); // Llama a la función para obtener el token CSRF

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken, // Incluye el token CSRF en los encabezados
        },
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json(); // Intenta obtener datos de error
        throw new Error(`Error al subir el archivo: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('Archivo subido:', data);

      // Llamamos a la función para notificar que el archivo se subió con éxito
      // Pasamos el nombre del archivo y la descripción proporcionada por el usuario
      onFileUploadSuccess({
        nombre: data.titulo,
        descripcion: data.descripcion || 'Sin descripción',
        fecha: new Date(data.uploaded_at).toLocaleDateString(),
        fileUrl: `http://localhost:8000/media/${data.file_name}`
      });

      alert('Archivo subido con éxito.');
      setFile(null);
      setTitulo('');
      setDescripcion('');
      setError(''); // Limpiar el error
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo: ' + error.message); // Muestra el mensaje de error
    }
  };

  return (
    <div className="file-upload">
      <h4>Subir Archivo</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={handleTituloChange}
        />
        {error && <p className="error">{error}</p>}
        <input
          type="file"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={handleDescripcionChange}
        />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default FileUpload;
