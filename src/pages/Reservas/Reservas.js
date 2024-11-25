import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reservas.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [error, setError] = useState(null);

  const getCSRFToken = () => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='));
    return cookie ? cookie.split('=')[1] : null;
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const csrfToken = getCSRFToken();
        const response = await axios.get('http://localhost:8000/api/reservas', {
          headers: { 'X-CSRFToken': csrfToken },
          withCredentials: true,
        });
        setReservas(response.data);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
        setError('No se pudieron cargar las reservas.');
      }
    };
    fetchReservas();
  }, []);

  const handleReserva = async (e) => {
    e.preventDefault();
    const nuevaReserva = {
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    };
    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post('http://localhost:8000/api/reservas', nuevaReserva, {
        headers: { 'X-CSRFToken': csrfToken },
        withCredentials: true,
      });
      setReservas([...reservas, response.data]);
      setFecha('');
      setHoraInicio('');
      setHoraFin('');
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      setError('No se pudo crear la reserva.');
    }
  };

  return (
    <div className="reservas-container">
      <h2 className="reservas-title">Gestión de Reservas</h2>
      <form onSubmit={handleReserva} className="reservas-form">
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
        <label>
          Hora de Inicio:
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        </label>
        <label>
          Hora de Fin:
          <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        </label>
        <button type="submit">Reservar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ul className="reservas-list">
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.fecha} {reserva.hora_inicio} - {reserva.hora_fin}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservas;
