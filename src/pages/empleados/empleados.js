import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Empleados.css";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/empleados/');
        setEmpleados(response.data);
      } catch (error) {
        setError("Error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);
  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="employee-section">
      <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
      <div className="employee-cards">
        {empleados.map((empleado) => (
          <div className="employee-card" key={empleado.id}>
            <div className="employee-image-container">
              <img
                src={empleado.foto}
                alt={empleado.name}
                className="employee-image"
              />
            </div>
            <h3 className="employee-name">{empleado.nombre}</h3>
            <p className="employee-info">
              <strong>Estado: </strong>
              {empleado.baja==false && empleado.excedencia==false && empleado.vacaciones==false && empleado.teletrabajo==false  ? "Está trabajando" : "No está trabajando"}
            </p>
            <p className="employee-info">
              <strong>Cumpleaños:</strong> {empleado.cumpleanos}
            </p>
            <p className="employee-info">
              <strong>Contratación:</strong> {empleado.fecha_contratacion}
            </p>
            <p className="employee-info">
              <strong>Correo:</strong> {empleado.email}
            </p>
            <p className="employee-info">
              <strong>Teléfono:</strong> {empleado.telefono}
            </p>
            <p className="employee-info">
              <strong>Oficina:</strong> {empleado.sede}
            </p>
            <p className="employee-info">
              <strong>Supervisor:</strong> {empleado.supervisor}
            </p>
            <p className="employee-info">
              <strong>Puesto:</strong> {empleado.rol.nombre}
            </p>
            <p className="employee-info">
              <strong>Vacaciones: </strong> 
              {empleado.vacaciones ? "Está de vacaciones" : "No está de vacaciones"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Empleados;
