import React from 'react';
import './Modal.css';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  // Manejar clics fuera del contenido del modal
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('custom-modal')) {
      onClose();
    }
  };

  return (
    <div className="custom-modal" onClick={handleOutsideClick}>
      <div className="custom-modal-content">
        <span className="custom-close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
