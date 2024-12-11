import React from 'react';
import Protocolos from './Protocolos';
import FileUpload from '../../components/FileUpload';
import './Protocolos.css';

const ProtocolosView = () => {
  const handleFileUploadSuccess = (newFile) => {
console.log(newFile);
  };

  return (
    <section className="protocols-section">
      <Protocolos />
      <FileUpload onFileUploadSuccess={handleFileUploadSuccess} />
      <button className="inicio" onClick={() => (window.location.href = "/")}>Inicio</button>
    </section>
  );
};

export default ProtocolosView;
