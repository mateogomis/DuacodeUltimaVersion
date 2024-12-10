import React from 'react';
import './Modal.css';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="custom-modal">
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
