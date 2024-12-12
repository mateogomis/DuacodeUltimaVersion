import React from 'react';
import Protocolos from './Protocolos';
import FileUpload from '../../components/FileUpload';
import './Protocolos.css';

const ProtocolosView = () => {
  const handleFileUploadSuccess = (newFile) => {

  };

  return (
    <section className="protocols-section">
      <Protocolos />
      <FileUpload onFileUploadSuccess={handleFileUploadSuccess} />
     
    </section>
  );
};

export default ProtocolosView;
