import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ children }) => {
    const t = localStorage.getItem("role"); // Récupère le token du localStorage

    // Vérifie si l'utilisateur est authentifié
    if (!t && t !== process.env.REACT_APP_ROLE_USER) {
        alert("Vous n'êtes pas autorisé à accéder à cette page.");
        return <Navigate to="/" replace />; // Redirige vers la page de connexion
    }

    return children; // Rend les enfants si l'utilisateur est authentifié
};

export default ProtectedRouteUser;