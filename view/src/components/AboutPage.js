import React from 'react';
import './css/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* En-tête */}
      <header className="about-hero">
        <div className="about-hero-inner">
          <span className="about-badge">À propos</span>
          <h1>Tout votre univers visuel, au même endroit.</h1>
          <p>
            CinéManga répertorie une vaste collection de films, séries et mangas
            pour vous offrir une expérience de divertissement complète, fiable et
            toujours à jour.
          </p>
        </div>
      </header>

      <div className="about-body">
        {/* Mission */}
        <section className="about-section">
          <h2>Notre mission</h2>
          <p>
            Nous croyons que tout le monde devrait avoir accès à des informations
            fiables et complètes sur ses films, séries et mangas préférés. Que vous
            soyez passionné d'action, amateur de romance ou fan de science-fiction,
            notre plateforme vous aide à trouver les œuvres qui correspondent à vos goûts.
          </p>
        </section>

        {/* Technologies */}
        <section className="about-section">
          <h2>Technologies utilisées</h2>
          <div className="about-tech">
            <div className="tech-card">
              <div className="tech-icon">⚛️</div>
              <h3>React</h3>
              <p>Une interface utilisateur dynamique et réactive.</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🎼</div>
              <h3>Symfony</h3>
              <p>Le backend et les API de notre base de contenu.</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🗄️</div>
              <h3>SQL</h3>
              <p>Le stockage des films, séries et mangas.</p>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="about-section">
          <h2>Notre équipe</h2>
          <p>
            Nous sommes une équipe de passionnés de films, de séries et de mangas,
            dédiée à créer une plateforme intuitive et riche en contenu pour les
            amateurs de divertissement visuel.
          </p>
          <p className="about-thanks">
            Merci d'utiliser CinéManga pour découvrir et redécouvrir vos œuvres
            préférées. Nous espérons que vous y trouverez de belles recommandations !
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
