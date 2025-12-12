import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './css/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaRef = useRef();

  const navigate = useNavigate();
  const token = process.env.REACT_APP_TOKEN;
  const roleU = process.env.REACT_APP_ROLE_USER;
    const roleA = process.env.REACT_APP_ROLE_ADMIN;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation du captcha
    if (!captchaToken) {
      alert('Veuillez valider le captcha');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, captchaToken }),
      });

      const data = await response.json();

      console.log("Réponse de l'API de connexion :", data);

      if (response.ok && data.status === 'success') {
        // Structure de réponse du AuthController
        const userData = data.datas; // Le contrôleur renvoie toujours data.datas
        
        // Stockage des informations utilisateur
        localStorage.setItem("jwtToken", data.token); // JWT pour les appels API sécurisés
        localStorage.setItem("token", userData.token); // basicToken ou admin token (pour vérification côté client)
        localStorage.setItem("id", userData.id);
        localStorage.setItem("lastname", userData.lastname);
        localStorage.setItem("firstname", userData.firstname);
        localStorage.setItem("email", userData.email);
        localStorage.setItem("role", userData.role);

        // Vérification du statut du compte
        if (userData.status === false) {
          alert("Votre compte est désactivé, veuillez contacter l'administrateur.");
          navigate('/contact');
          return;
        }

        // Redirection selon le rôle
        if (userData.role === 'ROLE_ADMIN' && userData.token === token) {
          alert("Vous allez être redirigé vers la page admin.");
          window.location.href = '/admin';
        } else if (userData.role === 'ROLE_USER' && userData.token === 'basicToken') {
          alert("Vous allez être redirigé vers la page de votre profil.");
          window.location.href = '/profil';
        } else {
          alert("Connexion réussie !");
          window.location.href = '/profil';
        }
      } else {
        // Gestion des erreurs
        const errorMessage = data.message || 'Une erreur est survenue';
        
        if (errorMessage.includes('Identifiants invalides') || errorMessage.includes('invalide')) {
          alert("Email ou mot de passe incorrect.");
        } else if (errorMessage.includes('désactivé') || errorMessage.includes('disabled')) {
          alert("Votre compte est désactivé, veuillez contacter l'administrateur.");
          navigate('/contact');
        } else if (errorMessage.includes('verrouillé') || errorMessage.includes('locked')) {
          alert(errorMessage); // Affiche le message de verrouillage avec le temps restant
        } else {
          alert(errorMessage);
        }

        // Réinitialisation du mot de passe et captcha
        setPassword('');
        setCaptchaToken('');
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert("Erreur de connexion au serveur. Veuillez réessayer.");
      setPassword('');
      setCaptchaToken('');
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="auth-container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Google reCAPTCHA */}
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken('')}
          />
        </div>

        <button type="submit" disabled={!captchaToken}>Se connecter</button>
      </form>
      <p className="switch-auth">
        Pas encore de compte ? <a href="/register">Inscrivez-vous ici</a>.
      </p>
    </div>
  );
};

export default Login;
