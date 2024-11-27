import React, { useEffect, useState } from "react";
// import "./Salas.css";
import axios from "axios";
const Salas = () => {
  // const rooms = [
  //   {
  //     id: 1,
  //     name: "Sala de Reuniones A",
  //     capacity: 10,
  //     availability: "Libre",
  //     status: "Disponible",
  //     locationUrl: "https://www.google.com/maps/place/Avenida+de+Catalu%C3%B1a+9/@39.4789099,-0.3578712,684m/data=!3m3!1e3!4b1!5s0xd6048989092a1ab:0x6a789a75536c54f2!4m6!3m5!1s0xd6048989a8d70bb:0x3ba1acbdf00c31f!8m2!3d39.4789058!4d-0.3552963!16s%2Fg%2F11gh01zt6m?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D",
  //   },
  //   {
  //     id: 2,
  //     name: "Sala de Conferencias",
  //     capacity: 25,
  //     availability: "Ocupada",
  //     status: "No Disponible",
  //     locationUrl: "https://www.google.com/maps/place/duacode/@43.3675685,-8.4033268,644m/data=!3m3!1e3!4b1!5s0xd2e7c7e3d186475:0x7edf0a3a897a156c!4m6!3m5!1s0xd2e7c88b31e218b:0xede967cd590ff102!8m2!3d43.3675646!4d-8.4007519!16s%2Fg%2F1ptz22tlv?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D",
  //   },
  //   {
  //     id: 3,
  //     name: "Sala de Proyectos",
  //     capacity: 15,
  //     availability: "Libre",
  //     status: "Disponible",
  //     locationUrl: "https://maps.google.com?q=Sala+de+Proyectos",
  //   },
  // ];
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/sedes/salas/"
        );
        console.log(response.data);
        setSalas(response.data);
      } catch (error) {
        setError("Error al obtener las salas");
      } finally {
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);
  if (loading) return <p>Cargando salas...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="salas-section">
      <h2 className="salas-section-title">Salas</h2>
      <div className="salas-cards">
        {salas.map((sala) => (
          <div className="salas-card" key={sala.id}>
            <div className="salas-image-container">
              <img src={sala.imagen_url} alt={sala.nombre} className="salas-image" />
            </div>
            <h3 className="salas-name">{sala.nombre}</h3>
            <p className="salas-info">
              <strong>Capacidad: </strong>
              {sala.capacidad} personas
            </p>
            <p className="salas-info">
              <strong>Sede n.º</strong> {sala.sede}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Salas;
