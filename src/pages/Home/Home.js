import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css"; // Estilos por defecto del calendario
import "./Home.css";
import Empleados from "../empleados/Empleados";
import Salas from "../Salas/Salas";
import Protocolos from "../Protocolos/Protocolos";
import Eventos from "../Eventos/Eventos";
const Home = () => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      birthday: "15 de Junio, 1985",
      hireDate: "1 de Marzo, 2015",
      email: "john.doe@example.com",
      phone: "+1 123 456 7890",
      office: "Oficina Principal",
      supervisor: "Jane Smith",
      position: "Ingeniero de Software",
      vacations: "5 días restantes",
      status: "En la oficina",
      image: "/assets/images/john-doe.jpg",
      description: "Encargado de desarrollar y mantener software de calidad.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      birthday: "20 de Febrero, 1990",
      hireDate: "15 de Septiembre, 2017",
      email: "sarah.johnson@example.com",
      phone: "+1 987 654 3210",
      office: "Teletrabajo",
      supervisor: "Michael Brown",
      position: "Gerente de Proyectos",
      vacations: "10 días restantes",
      status: "Teletrabajando",
      image: "/assets/images/sarah-johnson.jpg",
      description: "Gestión de equipos y coordinación de proyectos clave.",
    },
  ];

  const companyInfo = [
    {
      title: "Evento de Innovación",
      description: "Explora las últimas tendencias en tecnología e innovación.",
      level: "Avanzado",
      levelColor: "#DC3545",
    },
    {
      title: "Conferencia de Software",
      description:
        "Descubre herramientas y prácticas modernas para desarrolladores.",
      level: "Intermedio",
      levelColor: "#FFC107",
    },
    {
      title: "Taller de Diseño UX",
      description:
        "Aprende cómo mejorar la experiencia de usuario con expertos.",
      level: "Principiante",
      levelColor: "#28A745",
    },
  ];

  const rooms = [
    {
      id: 1,
      name: "Sala de Reuniones A",
      capacity: 10,
      availability: "Libre",
      status: "Disponible",
    },
    {
      id: 2,
      name: "Sala de Conferencias",
      capacity: 25,
      availability: "Ocupada",
      status: "No Disponible",
    },
    {
      id: 3,
      name: "Sala de Proyectos",
      capacity: 15,
      availability: "Libre",
      status: "Disponible",
    },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const simulatedEvents = [
      { title: "Evento A", date: "2024-11-22" },
      { title: "Evento B", date: "2024-11-23" },
    ];

    const formattedDate = date.toISOString().split("T")[0];
    const filteredEvents = simulatedEvents.filter(
      (event) => event.date === formattedDate
    );
    setEventsForDate(filteredEvents);
  };

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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#plans">Plans</a>
          <a href="#contact">Contact</a>
          <a href="/login" className="header-login">
            Log In
          </a>
        </nav>
      </header>

      <main className="home-main">
        <h1 className="home-title">Bienvenido a duacode</h1>
        <p className="home-subtitle">Presiona el botón para iniciar sesión</p>
        <button className="home-button">Iniciar sesión</button>
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

      <calendario />
      <Salas />

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
