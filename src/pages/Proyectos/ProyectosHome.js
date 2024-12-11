import React from 'react';
import './Salas.css';
import Proyectos from './Proyectos';

const SalasHome = () => {
  return (
    <section className="proyectos-section">
      <Proyectos showButton={false} />
    </section>
  );
};

export default SalasHome;
