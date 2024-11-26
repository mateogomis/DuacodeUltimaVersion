import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Empleados.css";

const Empleados = () => {
  const [empleado, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get("");
        setEmpleados(response.data);
      } catch (error) {
        setError("Error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);
  if (loading) return <p>Cargando empleados</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="employee-section">
      <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
      <div className="employee-cards">
        {employees.map((employee) => (
          <div className="employee-card" key={empleado.id}>
            <div className="employee-image-container">
              <img
                src={empleado.image}
                alt={empleado.name}
                className="employee-image"
              />
            </div>
            <h3 className="employee-name">{empleado.name}</h3>
            <p className="employee-info">
              <strong>Estado:</strong> {empleado.status}
            </p>
            <p className="employee-info">
              <strong>Cumpleaños:</strong> {empleado.birthday}
            </p>
            <p className="employee-info">
              <strong>Contratación:</strong> {empleado.hireDate}
            </p>
            <p className="employee-info">
              <strong>Correo:</strong> {empleado.email}
            </p>
            <p className="employee-info">
              <strong>Teléfono:</strong> {empleado.phone}
            </p>
            <p className="employee-info">
              <strong>Oficina:</strong> {empleado.office}
            </p>
            <p className="employee-info">
              <strong>Supervisor:</strong> {empleado.supervisor}
            </p>
            <p className="employee-info">
              <strong>Puesto:</strong> {empleado.position}
            </p>
            <p className="employee-info">
              <strong>Vacaciones:</strong> {empleado.vacations}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Empleados;
