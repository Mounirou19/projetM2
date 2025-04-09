import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/'); // Redirige vers la page de connexion
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>404 - Page Non Trouvée</h1>
            <h2>Désolé, la page que vous recherchez n'existe pas.</h2>
            <button onClick={handleGoToLogin}>Retour à la page de connexion</button>
        </div>
    );
};

export default NotFoundPage;