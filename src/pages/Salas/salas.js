import React from "react";
import "./Salas.css";

const Salas = () => {
  const rooms = [
    {
      id: 1,
      name: "Sala de Reuniones A",
      capacity: 10,
      availability: "Libre",
      status: "Disponible",
      locationUrl: "https://maps.google.com?q=Sala+de+Reuniones+A",
    },
    {
      id: 2,
      name: "Sala de Conferencias",
      capacity: 25,
      availability: "Ocupada",
      status: "No Disponible",
      locationUrl: "https://maps.google.com?q=Sala+de+Conferencias",
    },
    {
      id: 3,
      name: "Sala de Proyectos",
      capacity: 15,
      availability: "Libre",
      status: "Disponible",
      locationUrl: "https://maps.google.com?q=Sala+de+Proyectos",
    },
  ];

  return (
    <section className="room-section">
      <h2 className="room-section-title">Salas y Disponibilidad</h2>
      <div className="room-cards">
        {rooms.map((room) => (
          <div className="room-card" key={room.id}>
            <div className="room-header">
              <h3>{room.name}</h3>
              <a
                href={room.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="room-map-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </a>
            </div>
            <p><strong>Aforo:</strong> {room.capacity}</p>
            <p><strong>Disponibilidad:</strong> {room.availability}</p>
            <p><strong>Estado:</strong> {room.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Salas;
