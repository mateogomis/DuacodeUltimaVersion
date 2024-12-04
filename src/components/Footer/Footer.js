import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left:0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>DUACODE</h3>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#faq">Preguntas Frecuentes</a></li>
            <li><a href="#privacy">Política de Privacidad</a></li>
            <li><a href="#terms">Términos y Condiciones</a></li>
            <li><a href="#accessibility">Declaración de Accesibilidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contáctanos</h4>
          <ul className="footer-contact">
            <li>info@duacode.com</li>
            <li>+34 123-456-789</li>
            <li>Calle Innovación 12</li>
            <li>Madrid, España</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <ul className="footer-links">
            <a href="https://www.instagram.com"><img src="/IconoInsta.png"/></a>
            <a href="https://www.facebook.com"><img src="/IconoFace.png"/></a>
            <a href="https://www.linkedin.com"><img src="/IconoLink.png"/></a>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 DUACODE. Todos los derechos reservados.</p>
        <button onClick={scrollToTop} className="back-to-top">Volver Arriba</button>
      </div>
    </footer>
  );
};

export default Footer;
