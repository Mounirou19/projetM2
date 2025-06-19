import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const token = process.env.REACT_APP_TOKEN;
  const roleU = process.env.REACT_APP_ROLE_USER;
    const roleA = process.env.REACT_APP_ROLE_ADMIN;

  const handleLogin = async (e) => {
    e.preventDefault();
    // Logique d'authentification (appel API, etc.)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
          const data = await response.json();
          if(data.datas.status === true){
            localStorage.setItem("token", data.datas.token);
            localStorage.setItem("id", data.datas.id);
            localStorage.setItem("lastname", data.datas.lastname);
            localStorage.setItem("firstname", data.datas.firstname);
            localStorage.setItem("email", data.datas.email);
            localStorage.setItem("role", data.datas.role);
            localStorage.setItem('jwtToken', data.token);
            console.log("Connexion réussie :", data.datas);
            console.log(roleA)
            if (data.datas.token === token && data.datas.role === roleA) {
                alert("Vous allez être redirigé vers la page admin.");
                window.location.href = '/admin'; // Redirige vers la page admin
            }else if (data.datas.token === 'basicToken' && data.datas.role === roleU) {
              alert("Vous allez être redirigé vers la page de votre profil.");
              window.location.href = '/profil'; // Redirige vers la page d'accueil
            }
          }else{
            alert("Votre compte est désactivé, veuillez contacter l'administrateur.");
            navigate('/contact');
          }
      } else {
        const data = await response.json();

        if(data.message == "noUser"){
          alert("L'email n'existe pas.");
          setEmail('');
          setPassword('');
        }else if(data.message == "badPassword"){
          alert("Le mot de passe est incorrect.");
          setPassword('');
        }else{
          alert("Une erreur est survenue, veuillez réessayer.");
        }
        // Réinitialisation des champs
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

        <button type="submit">Se connecter</button>
      </form>
      <p className="switch-auth">
        Pas encore de compte ? <a href="/register">Inscrivez-vous ici</a>.
      </p>
    </div>
  );
};

export default Login;
