/**
 * Componente Home
 * 
 * Este componente representa la página principal de la aplicación que contiene enlaces a diferentes secciones como Organigrama, Protocolos, Proyectos, Calendario y Salas. Además, muestra un video de fondo y citas inspiradoras.
 * 
 * Estados:
 * - `observer`: Referencia al observador de intersección para rastrear la visibilidad de los elementos de la página.
 * - `roomElements`: Elementos DOM que se observan para agregar la clase "visible" cuando se vuelven visibles en la pantalla.
 * 
 * Métodos:
 * - `useEffect`: Configura un observador de intersección para mostrar elementos cuando son visibles al 50%.
 * - `handleNavigation`: Función para redirigir a diferentes vistas cuando se hace clic en los botones de navegación.
 * - `handleOutsideClick`: Función para manejar clics fuera del contenido del modal.
 * 
 * UI:
 * - Encabezado de navegación con enlaces a otras secciones de la aplicación.
 * - Video de fondo que se reproduce automáticamente y en bucle.
 * - Citas inspiradoras y vistas de diferentes componentes como Empleados, Proyectos, Calendario y Salas.
 * - Muestra un organigrama de la empresa con una imagen previa y un botón para ver más detalles.
 * - Mensaje de error que se muestra al usar el componente Modal si no es visible.
 * 
 * Estilos:
 * - `Home.css`, `OrganigramaHome.css` se utilizan para personalizar la apariencia del componente.
 * - `Modal.css` se utiliza para estilizar el componente Modal que se muestra en la página.
 */
import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css"; 
import "./Home.css";
import Empleados from "../Empleados/Empleados";
import Salas from "../Salas/Salas";
import Protocolos from "../Protocolos/Protocolos"; 
import Calendario from "../Calendario/Calendario";
import Proyectos from "../Proyectos/Proyectos";
import '../Organigrama/OrganigramaHome.css';

/**
 * Componente principal de la página de inicio.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => {
  /**
   * Hook de efecto secundario para observar la intersección de elementos.
   * Se añade la clase 'visible' a los elementos cuando se vuelven visibles.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 } // Activar cuando el 50% del elemento es visible
    );

    const roomElements = document.querySelectorAll(".room-card");
    roomElements.forEach((el) => observer.observe(el));

    // Limpiar el observador cuando el componente se desmonta
    return () => {
      roomElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-logo"></div>
        <nav className="header-nav">
          <button onClick={() => (window.location.href = "/Organigrama")}>Organigrama</button>
          <button onClick={() => (window.location.href = "/Protocolos")}>Protocolos</button>
          <button onClick={() => (window.location.href = "/Proyectos")}>Proyectos</button>
          <button onClick={() => (window.location.href = "/Calendario")}>Calendario</button>
          <button onClick={() => (window.location.href = "/Salas")}>Salas</button>
        </nav>
        <button
          className="login-button-unique"
          onClick={() => (window.location.href = "/login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-door-open-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
          </svg>
        </button>
      </header>

      <main className="home-main">
        {/* Fondo de video */}
        <div className="video-background">
          <video autoPlay muted loop className="background-video">
            <source
              src="https://cdn.pixabay.com/video/2023/04/11/158384-816637349_large.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta vídeos HTML5.
          </video>
        </div>
        {/* Contenido superpuesto */}
        <div className="home-content">
          <h1 className="home-title">Bienvenido a Duacode</h1>
        </div>
      </main>

      <Empleados />
      <Proyectos limite={3}  />

      <section className="nature-section">
        <h2 className="nature-title">
          "El diseño no es solo cómo se ve o cómo se siente. El diseño es cómo
          funciona."
          <br />
          <span className="nature-author">— Steve Jobs</span>
        </h2>
      </section>

      <Calendario />
      <Salas />

      <section className="organigrama-section">
        <h2 className="organigrama-title">Organigrama de la Empresa</h2>
        <div className="organigrama-link-container">
          <div className="organigrama-preview">
            <p className="organigrama-preview-text">
              Explora cómo nuestra empresa está estructurada y conoce a nuestros
              líderes clave.
            </p>
            <div className="organigrama-preview-image">
              <img
                src="/Organigrama.jpg"
                alt="Organigrama Preview"
                className="organigrama-image"
              />
            </div>
          </div>
          <button
            className="organigrama-button"
            onClick={() =>
              (window.location.href = "http://localhost:3000/Organigrama")
            }
          >
            <span>Ver Organigrama</span>
          </button>
        </div>
      </section>

      <section className="basket-section">
        <h2 className="basket-title">
          "El talento gana partidos, pero el trabajo en equipo y la inteligencia
          ganan campeonatos."
          <br />
          <span className="basket-author">— Michael Jordan</span>
        </h2>
      </section>
      <Protocolos limite={3}/>
    </div>
  );
};

export default Home;
