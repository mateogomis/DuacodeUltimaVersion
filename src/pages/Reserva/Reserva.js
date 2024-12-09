import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Reserva/Reservar.css"; // Cambiado al nombre correcto del archivo CSS

const Reserva = () => {
  const { salaId } = useParams();
  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [empleadosAsistentes, setEmpleadosAsistentes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCSRFToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return cookie ? cookie.split("=")[1] : null;
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const csrfToken = getCSRFToken();
        
        // Fetch reservation data
        const reservasResponse = await axios.get(
          `http://localhost:8000/api/sedes/reservas/`,
          {
            withCredentials: true,
            headers: { "X-CSRFToken": csrfToken },
          }
        );
        setReservas(reservasResponse.data);

        // Fetch employees data
        const empleadosResponse = await axios.get(
          `http://localhost:8000/api/empleados/`,
          {
            withCredentials: true,
            headers: { "X-CSRFToken": csrfToken },
          }
        );
        setEmpleados(empleadosResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [salaId]);

  const handleReserva = async (e) => {
    e.preventDefault();
    const nuevaReserva = {
      sala: salaId,
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      empleados_asistentes: empleadosAsistentes,
    };
    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post(
        `http://localhost:8000/api/sedes/reservas/`,
        nuevaReserva,
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrfToken },
        }
      );
      alert("Reserva creada exitosamente!");
      setFecha("");
      setHoraInicio("");
      setHoraFin("");
      setEmpleadosAsistentes([]);
    } catch (error) {
      console.error("Error al realizar la reserva:", error.response.data);
      alert("Error al realizar la reserva");
    }
  };

  if (loading) return <p className="loading-message">Cargando reservas...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="reserva-container">
      <div className="titulo-principal">Reservar Sala</div>
      <form onSubmit={handleReserva} className="formulario-reserva">
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <label>
          Hora de Inicio:
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </label>
        <label>
          Hora de Fin:
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </label>
        <label>
          Empleados Asistentes:
          <select
            multiple
            value={empleadosAsistentes}
            onChange={(e) =>
              setEmpleadosAsistentes(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.nombre} {empleado.apellido_1}
              </option>
            ))}
          </select>
        </label>
        <div className="botones-formulario">
          <button type="submit" className="boton-submit">
            Reservar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reserva;
