import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css"; // Estilos por defecto del calendario
import "./Home.css";
import Empleados from "../Empleados/Empleados";
import Salas from "../Salas/Salas";
import Protocolos from "../Protocolos/Protocolos";
import Eventos from "../Eventos/Eventos";
import Calendario from "../Calendario/Calendario";
import Organigrama from "../Organigrama/Organigrama";
import Proyectos from "../Proyectos/Proyectos";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    const roomElements = document.querySelectorAll(".room-card");
    roomElements.forEach((el) => observer.observe(el));

    return () => {
      roomElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-logo">DUACODE</div>
        <nav className="header-nav">
          <a href="/Proyectos">Proyectos</a>
          <a href="#protocolos">Protocolos</a>
          <a href="/Salas">Salas</a>
          <a href="/Organigrama">Organigrama</a>
          <a href="#eventos">Eventos</a>
          <a href="#nuestroEquipo">Nuestro equipo</a>
        </nav>
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
          <h1 className="home-title">Bienvenido a duacode</h1>
          <a href="/login" className="home-button">
            {" "}
            Iniciar sesión
          </a>
        </div>
      </main>

      <Empleados />
      <Eventos />

      <section className="nature-section">
        <h2 className="nature-title">
          "El diseño no es solo cómo se ve o cómo se siente. El diseño es cómo
          funciona."
          <br />
          <span className="nature-author">— Steve Jobs</span>
        </h2>
      </section>

      <Calendario />
      {/* <Salas /> */}

      <section className="organigrama-section">
        <h2 className="organigrama-title">Organigrama de la Empresa</h2>
        <div className="organigrama-container">
          {/* Nivel 1 */}
          <div className="organigrama-node">
            <div className="organigrama-image-container">
              <img
                src="/assets/images/mark-davis.jpg"
                alt="Mark Davis"
                className="organigrama-image"
              />
            </div>
            <h3 className="organigrama-name">Mark Davis</h3>
            <p className="organigrama-position">Director General</p>
            <p className="organigrama-description">
              Lidera la estrategia y dirección global.
            </p>
          </div>

          {/* Nivel 2 */}
          <div className="organigrama-level">
            <div className="organigrama-node">
              <div className="organigrama-image-container">
                <img
                  src="/assets/images/tony-adams.jpg"
                  alt="Tony Adams"
                  className="organigrama-image"
                />
              </div>
              <h3 className="organigrama-name">Tony Adams</h3>
              <p className="organigrama-position">Director Técnico</p>
              <p className="organigrama-description">
                Supervisa el desarrollo tecnológico.
              </p>
            </div>

            <div className="organigrama-node">
              <div className="organigrama-image-container">
                <img
                  src="/assets/images/anne-parker.jpg"
                  alt="Anne Parker"
                  className="organigrama-image"
                />
              </div>
              <h3 className="organigrama-name">Anne Parker</h3>
              <p className="organigrama-position">Directora de Marketing</p>
              <p className="organigrama-description">
                Dirige las estrategias de marketing.
              </p>
            </div>
          </div>

          {/* Nivel 3 */}
          <div className="organigrama-level">
            <div className="organigrama-node">
              <div className="organigrama-image-container">
                <img
                  src="/assets/images/team-member.jpg"
                  alt="Team Member"
                  className="organigrama-image"
                />
              </div>
              <h3 className="organigrama-name">Equipo A</h3>
              <p className="organigrama-position">Desarrollador Frontend</p>
            </div>
            <div className="organigrama-node">
              <div className="organigrama-image-container">
                <img
                  src="/assets/images/team-member.jpg"
                  alt="Team Member"
                  className="organigrama-image"
                />
              </div>
              <h3 className="organigrama-name">Equipo B</h3>
              <p className="organigrama-position">Analista de Datos</p>
            </div>
          </div>
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

      <Protocolos />
    </div>
  );
};

export default Home;
