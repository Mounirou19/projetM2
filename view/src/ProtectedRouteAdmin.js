import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children }) => {
    const t = localStorage.getItem("token"); // Récupère le token du localStorage
    const r = localStorage.getItem("role"); // Récupère le token du localStorage

    // Vérifie si l'utilisateur est authentifié
    if (!t && !r && t !== process.env.REACT_APP_TOKEN && r !== process.env.REACT_APP_ROLE_ADMIN) {
        alert("Vous n'êtes pas autorisé à accéder à cette page.");
        return <Navigate to="/" replace />; // Redirige vers la page de connexion
    }

    return children; // Rend les enfants si l'utilisateur est authentifié
};

export default ProtectedRouteAdmin;