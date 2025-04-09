import React from 'react';
import './css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>À propos de Nous</h1>
      <p>
        Bienvenue sur notre plateforme ! Nous répertorions une vaste collection de
        films, séries et mangas pour vous offrir une expérience de divertissement
        complète. Notre mission est de rendre accessible une base de données enrichie
        et mise à jour pour les amateurs de culture visuelle.
      </p>

      <h2>Notre Mission</h2>
      <p>
        Nous croyons que tout le monde devrait avoir accès à des informations fiables
        et complètes sur leurs films, séries et mangas préférés. Que vous soyez un
        passionné d'action, un amateur de romance ou un fan de science-fiction, notre
        site est là pour vous aider à trouver les œuvres qui correspondent à vos
        goûts.
      </p>

      <h2>Technologies Utilisées</h2>
      <ul>
        <li><strong>React</strong> - Pour une interface utilisateur dynamique et réactive.</li>
        {/* <li><strong>Redux</strong> - Pour une gestion d'état efficace de l'application.</li> */}
        <li><strong>Symfony</strong> - Pour gérer le backend et les API de notre base de données de contenu.</li>
        <li><strong>SQL</strong> - Pour stocker les données de films, séries et mangas.</li>
      </ul>

      <h2>Notre Équipe</h2>
      <p>
        Nous sommes une équipe de passionnés de films, de séries et de mangas, dédiée
        à créer une plateforme intuitive et riche en contenu pour les amateurs de
        divertissement visuel.
      </p>

      <p>
        Merci d’utiliser notre site pour découvrir et redécouvrir vos œuvres
        préférées. Nous espérons que vous trouverez de nouvelles recommandations et
        que vous apprécierez l’expérience !
      </p>
    </div>
  );
};

export default About;
