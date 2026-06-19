import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import secureStorage from './utils/secureStorage';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userData = secureStorage.getUserData();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Classe pour NavLink : ajoute "active" sur le lien de la page courante
  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');

  return (
    <header className="header">
      {/* Logo / marque */}
      <div className="header-brand" onClick={() => { navigate('/'); closeMenu(); }}>
        <span className="brand-mark">C</span>
        <span className="brand-name">CinéManga</span>
      </div>

      {/* Menu burger (mobile) */}
      <button
        className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isMenuOpen}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Navigation */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" end className={linkClass} onClick={closeMenu}>Accueil</NavLink>
        <NavLink to="/media" className={linkClass} onClick={closeMenu}>Médias</NavLink>
        <NavLink to="/about" className={linkClass} onClick={closeMenu}>À propos</NavLink>
        <NavLink to="/contact" className={linkClass} onClick={closeMenu}>Contact</NavLink>

        {userData.role === process.env.REACT_APP_ROLE_ADMIN && (
          <NavLink to="/admin" className={linkClass} onClick={closeMenu}>Admin</NavLink>
        )}
        {userData.role === process.env.REACT_APP_ROLE_USER && (
          <NavLink to="/profil" className={linkClass} onClick={closeMenu}>Mon profil</NavLink>
        )}

        {userData.email ? (
          <NavLink to="/logout" className="nav-cta nav-cta-ghost" onClick={closeMenu}>Déconnexion</NavLink>
        ) : (
          <NavLink to="/login" className="nav-cta" onClick={closeMenu}>Connexion</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
