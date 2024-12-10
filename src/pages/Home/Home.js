import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css"; // Estilos por defecto del calendario
import "./Home.css";
import Empleados from "../Empleados/Empleados";
import Salas from "../Salas/Salas";
// import Protocolos from "../Protocolos/Protocolos";
import Calendario from "../TestCalendario/TestCalendario";
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
        <div className="header-logo"></div>
        <nav className="header-nav">
          <button onClick={() => (window.location.href = "/Proyectos")}>
            Proyectos
          </button>
          <button onClick={() => (window.location.href = "/Protocolos")}> 
            Protocolos
          </button>
          <button onClick={() => (window.location.href = "/Salas")}>
            Salas
          </button>
          <button onClick={() => (window.location.href = "/Organigrama")}>
            Organigrama
          </button>
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
          <h1 className="home-title">Bienvenido a Duacode</h1>
          <a href="/login" className="home-button">
            Iniciar sesión
          </a>
        </div>
      </main>

      <Empleados />
      <Proyectos limite={3} />

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
            Ver Organigrama
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
      <Protocolos />
    </div>
  );
};

export default Home;
