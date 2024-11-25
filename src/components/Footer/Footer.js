import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    // Función para desplazarse al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>DUACODE</h3>
        </div>
        <div className="footer-section">
          <h4>Recibe Actualizaciones Mensuales</h4>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Introduce tu correo"
              className="footer-input"
              required
            />
            <div className="footer-checkbox">
              <input type="checkbox" id="newsletter" />
              <label htmlFor="newsletter">
                Sí, suscríbeme a tu boletín.
              </label>
            </div>
            <button type="submit" className="footer-button">Suscribirse</button>
          </form>
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
          <h4>Menú</h4>
          <ul className="footer-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#explore">Explorar</a></li>
            <li><a href="#community">Comunidad</a></li>
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
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#tiktok">TikTok</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
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
