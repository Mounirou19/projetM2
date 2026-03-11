import React from 'react';
import { Navigate } from 'react-router-dom';
import secureStorage from './utils/secureStorage';

const ProtectedRouteUser = ({ children }) => {
    const userData = secureStorage.getUserData();
    const isAuth = secureStorage.isAuthenticated();

    // Vérifie si l'utilisateur est authentifié
    if (!isAuth || userData.role !== 'ROLE_USER') {
        alert("Vous n'êtes pas autorisé à accéder à cette page.");
        return <Navigate to="/" replace />; // Redirige vers la page de connexion
    }

    return children; // Rend les enfants si l'utilisateur est authentifié
};

export default ProtectedRouteUser;