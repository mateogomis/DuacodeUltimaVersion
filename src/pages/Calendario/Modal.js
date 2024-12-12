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
/**
 * Componente Modal
 *
 * Este componente proporciona una ventana emergente que muestra contenido adicional.
 * Los usuarios pueden cerrar el modal haciendo clic en el botón de cierre o en el área externa al contenido.
 *
 * Propiedades:
 * - `isVisible`: Indica si el modal debe ser visible o no.
 * - `onClose`: Función para cerrar el modal.
 * - `children`: Contenido que se mostrará dentro del modal.

 * Lógica:
 * - Si `isVisible` es `false`, el componente no se renderiza y se retorna `null`.
 * - Si `isVisible` es `true`, se muestra el modal con un fondo oscuro y un contenedor para el contenido.
 * - El fondo oscuro tiene un manejador de clics (`handleOutsideClick`) que cierra el modal si el usuario hace clic fuera del contenedor.
 * - El botón de cierre (`&times;`) también ejecuta la función `onClose` para cerrar el modal.
 *
 * Estilo:
 * - El modal tiene un estilo personalizado definido en `Modal.css` para darle un aspecto atractivo y nítido.
 */
