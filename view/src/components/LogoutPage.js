import React, { useEffect } from 'react';
import secureStorage from '../utils/secureStorage';

const Logout = () => {

  useEffect(() => {
    // Supprime toutes les données du localStorage
    secureStorage.clear();
    // Redirige vers la page de connexion
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }, []);

  return (
    <div className="logout-container">
      <h1>Déconnexion...</h1>
      <p>Vous allez être redirigé vers la page de connexion.</p>
    </div>
  );
};

export default Logout;
