import React from 'react';
import Protocolos from './Protocolos';
import FileUpload from '../../components/FileUpload';
import './Protocolos.css';

const ProtocolosView = () => {
  const handleFileUploadSuccess = (newFile) => {
    // Logic to add the new file to protocolos
  };

  return (
    <section className="protocols-section">
      <Protocolos />
      <FileUpload onFileUploadSuccess={handleFileUploadSuccess} />
    </section>
  );
};

export default ProtocolosView;
