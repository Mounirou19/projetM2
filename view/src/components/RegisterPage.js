import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Auth.css';

const Register = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName, firstName, email, password }),
      });
  
      if (response.ok) {
          alert("Inscription réussie, vous allez être redirigé vers la page de connexion.");
            navigate("/login");
      } else {
        alert("Échec de l'enregistrement, vous êtes déja un abonné contacter l'admin pour recupérer votre mot de passe.");
      }
    
    // Réinitialisation des champs
    setLastName('');
    setFirstName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container">
      <h1>Inscription</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <label htmlFor="lastName">Nom :</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="firstName">Prénom :</label>
        <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
        />

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

        <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">S'inscrire</button>
      </form>
      <p className="switch-auth">
        Vous avez déjà un compte ? <a href="/login">Connectez-vous ici</a>.
      </p>
    </div>
  );
};

export default Register;
