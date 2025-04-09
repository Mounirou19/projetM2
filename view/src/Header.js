import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-background" onClick={() => navigate("/")}>
        <img src="/logo-Photoroom.png" alt="logo site web" />
        <h1 className="logo">Films & Séries & Mangas</h1>
      </div>

      {/* Menu burger pour mobile */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation principale */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
        <Link to="/media" className="nav-link" onClick={() => setIsMenuOpen(false)}>Médias</Link>
        <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>À propos</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        {localStorage.getItem('role') === process.env.REACT_APP_ROLE_ADMIN && (
          <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>Admin</Link>
        )}
        {localStorage.getItem('role') === process.env.REACT_APP_ROLE_USER && (
          <Link to="/profil" className="nav-link" onClick={() => setIsMenuOpen(false)}>Mon profil</Link>
        )}
        {localStorage.getItem('email') ? (
          <Link to="/logout" className="nav-link" onClick={() => setIsMenuOpen(false)}>Déconnexion</Link>
        ) : (
          <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
