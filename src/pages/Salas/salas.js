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
      locationUrl: "https://www.google.com/maps/place/Avenida+de+Catalu%C3%B1a+9/@39.4789099,-0.3578712,684m/data=!3m3!1e3!4b1!5s0xd6048989092a1ab:0x6a789a75536c54f2!4m6!3m5!1s0xd6048989a8d70bb:0x3ba1acbdf00c31f!8m2!3d39.4789058!4d-0.3552963!16s%2Fg%2F11gh01zt6m?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D",
    },
    {
      id: 2,
      name: "Sala de Conferencias",
      capacity: 25,
      availability: "Ocupada",
      status: "No Disponible",
      locationUrl: "https://www.google.com/maps/place/duacode/@43.3675685,-8.4033268,644m/data=!3m3!1e3!4b1!5s0xd2e7c7e3d186475:0x7edf0a3a897a156c!4m6!3m5!1s0xd2e7c88b31e218b:0xede967cd590ff102!8m2!3d43.3675646!4d-8.4007519!16s%2Fg%2F1ptz22tlv?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D",
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
