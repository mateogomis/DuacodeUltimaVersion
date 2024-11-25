import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Librería del calendario
import "react-calendar/dist/Calendar.css"; // Estilos por defecto del calendario
import "./Home.css";

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
      description: "Descubre herramientas y prácticas modernas para desarrolladores.",
      level: "Intermedio",
      levelColor: "#FFC107",
    },
    {
      title: "Taller de Diseño UX",
      description: "Aprende cómo mejorar la experiencia de usuario con expertos.",
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
          <a href="#login" className="header-login">
            Log In
          </a>
        </nav>
      </header>

      <main className="home-main">
        <h1 className="home-title">Bienvenido a duacode</h1>
        <p className="home-subtitle">Presiona el botón para iniciar sesión</p>
        <button className="home-button">Iniciar sesión</button>
      </main>

      <section className="employee-section">
        <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
        <div className="employee-cards">
          {employees.map((employee) => (
            <div className="employee-card" key={employee.id}>
              <div className="employee-image-container">
                <img
                  src={employee.image}
                  alt={employee.name}
                  className="employee-image"
                />
              </div>
              <h3 className="employee-name">{employee.name}</h3>
              <p className="employee-info">
                <strong>Estado:</strong> {employee.status}
              </p>
              <p className="employee-info">
                <strong>Cumpleaños:</strong> {employee.birthday}
              </p>
              <p className="employee-info">
                <strong>Contratación:</strong> {employee.hireDate}
              </p>
              <p className="employee-info">
                <strong>Correo:</strong> {employee.email}
              </p>
              <p className="employee-info">
                <strong>Teléfono:</strong> {employee.phone}
              </p>
              <p className="employee-info">
                <strong>Oficina:</strong> {employee.office}
              </p>
              <p className="employee-info">
                <strong>Supervisor:</strong> {employee.supervisor}
              </p>
              <p className="employee-info">
                <strong>Puesto:</strong> {employee.position}
              </p>
              <p className="employee-info">
                <strong>Vacaciones:</strong> {employee.vacations}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="event-section">
        <h2 className="event-section-title">Información de Eventos</h2>
        <div className="event-cards">
          {companyInfo.map((event, index) => (
            <div className="event-card" key={index}>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-level">
                <span
                  className="event-level-indicator"
                  style={{ backgroundColor: event.levelColor }}
                ></span>
                {event.level}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="nature-section">
  <h2 className="nature-title">
  "El diseño no es solo cómo se ve o cómo se siente. El diseño es cómo funciona."
    <br />
    <span className="nature-author">— Steve Jobs</span>
  </h2>
</section>


      <section className="calendar-section">
        <h2 className="calendar-title">Calendario Informativo</h2>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="custom-calendar"
          />
          <div className="calendar-events">
            <h3>Eventos para {selectedDate.toDateString()}</h3>
            {eventsForDate.length > 0 ? (
              eventsForDate.map((event, idx) => <p key={idx}>{event.title}</p>)
            ) : (
              <p>Sin eventos</p>
            )}
          </div>
        </div>
      </section>

      <section className="room-section">
        <h2 className="room-section-title">Salas y Disponibilidad</h2>
        <div className="room-cards">
          {rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <h3 className="room-name">{room.name}</h3>
              <p className="room-info">
                <strong>Aforo:</strong> {room.capacity}
              </p>
              <p className="room-info">
                <strong>Disponibilidad:</strong> {room.availability}
              </p>
              <p className="room-info">
                <strong>Estado:</strong> {room.status}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="organigrama-section">
  <h2 className="organigrama-title">Organigrama de la Empresa</h2>
  <div className="organigrama-container">
    {/* Nivel 1 */}
    <div className="organigrama-node">
      <div className="organigrama-image-container">
        <img src="/assets/images/mark-davis.jpg" alt="Mark Davis" className="organigrama-image" />
      </div>
      <h3 className="organigrama-name">Mark Davis</h3>
      <p className="organigrama-position">Director General</p>
      <p className="organigrama-description">Lidera la estrategia y dirección global.</p>
    </div>

    {/* Nivel 2 */}
    <div className="organigrama-level">
      <div className="organigrama-node">
        <div className="organigrama-image-container">
          <img src="/assets/images/tony-adams.jpg" alt="Tony Adams" className="organigrama-image" />
        </div>
        <h3 className="organigrama-name">Tony Adams</h3>
        <p className="organigrama-position">Director Técnico</p>
        <p className="organigrama-description">Supervisa el desarrollo tecnológico.</p>
      </div>

      <div className="organigrama-node">
        <div className="organigrama-image-container">
          <img src="/assets/images/anne-parker.jpg" alt="Anne Parker" className="organigrama-image" />
        </div>
        <h3 className="organigrama-name">Anne Parker</h3>
        <p className="organigrama-position">Directora de Marketing</p>
        <p className="organigrama-description">Dirige las estrategias de marketing.</p>
      </div>
    </div>

    {/* Nivel 3 */}
    <div className="organigrama-level">
      <div className="organigrama-node">
        <div className="organigrama-image-container">
          <img src="/assets/images/team-member.jpg" alt="Team Member" className="organigrama-image" />
        </div>
        <h3 className="organigrama-name">Equipo A</h3>
        <p className="organigrama-position">Desarrollador Frontend</p>
      </div>
      <div className="organigrama-node">
        <div className="organigrama-image-container">
          <img src="/assets/images/team-member.jpg" alt="Team Member" className="organigrama-image" />
        </div>
        <h3 className="organigrama-name">Equipo B</h3>
        <p className="organigrama-position">Analista de Datos</p>
      </div>
    </div>
  </div>
</section>

<section className="basket-section">
  <h2 className="basket-title">
    "El talento gana partidos, pero el trabajo en equipo y la inteligencia ganan campeonatos."
    <br />
    <span className="basket-author">— Michael Jordan</span>
  </h2>
</section>

<section className="protocols-section">
  <h2 className="protocols-title">Protocolos de la Empresa</h2>
  <div className="protocols-container">
    {/* Acceso Oficina */}
    <div className="protocol-circle">
      <div className="protocol-content">
        <span className="protocol-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" className="bi bi-lock">
            <path d="M11.5 8a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h7Zm-7-1A1.5 1.5 0 0 0 3 8.5v4A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 11.5 7h-7ZM8 5a2 2 0 0 1 2 2v1H6V7a2 2 0 0 1 2-2Zm0-1a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3Z"/>
          </svg>
        </span>
        <h3 className="protocol-name">Acceso Oficina</h3>
      </div>
      <p className="protocol-description">
        Aprende cómo ingresar a las oficinas de manera segura y eficiente.
      </p>
    </div>

    {/* Manuales */}
    <div className="protocol-circle">
      <div className="protocol-content">
        <span className="protocol-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16">
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
          </svg>
        </span>
        <h3 className="protocol-name">Manuales</h3>
      </div>
      <p className="protocol-description">
        Consulta los manuales oficiales para conocer nuestras políticas y procedimientos.
      </p>
    </div>

    {/* Herramientas */}
    <div className="protocol-circle">
      <div className="protocol-content">
        <span className="protocol-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
            <path d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814z"/>
            <path d="M9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
          </svg>
        </span>
        <h3 className="protocol-name">Herramientas</h3>
      </div>
      <p className="protocol-description">
        Descubre cómo utilizar correctamente las herramientas proporcionadas.
      </p>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
