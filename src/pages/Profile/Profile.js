import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Mi Perfil</h2>
      <p className="profile-info">Aquí puedes ver y editar tu información personal.</p>
      {/* Puedes añadir campos de perfil como nombre, correo, etc. */}
    </div>
  );
};

export default Profile;
