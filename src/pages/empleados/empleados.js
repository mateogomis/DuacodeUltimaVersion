import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Empleados.css";

const Empleados = () => {
  const [empleado, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  // useEffect(() => {
  //   const fetchEmpleados = async () => {
  //     try {
  //       const response = await axios.get("");
  //       setEmpleados(response.data);
  //     } catch (error) {
  //       setError("Error al obtener los empleados");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchEmpleados();
  // }, []);
  // if (loading) return <p>Cargando empleados</p>;
  // if (error) return <p>{error}</p>;

  return (
    <section className="employee-section">
      <h2 className="employee-section-title">Conoce a Nuestro Equipo</h2>
      <div className="employee-cards">
        {employees.map((empleado) => (
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
