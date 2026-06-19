import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  const [mediaByType, setMediaByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [topFilms, setTopFilms] = useState(null);
  const [topSeries, setTopSeries] = useState(null);
  const [topMangas, setTopMangas] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des médias');
        }
        const data = await response.json();

        // Organiser les médias par type et filtrer ceux avec status true
        const grouped = data.reduce((acc, media) => {
          if (media.status === true) {
            if (!acc[media.type]) acc[media.type] = [];
            acc[media.type].push(media);
          }
          return acc;
        }, {});

        // Le mieux noté de chaque type
        setTopFilms(grouped.film && grouped.film.reduce((a, f) => (f.score > a.score ? f : a), grouped.film[0]));
        setTopSeries(grouped.serie && grouped.serie.reduce((a, s) => (s.score > a.score ? s : a), grouped.serie[0]));
        setTopMangas(grouped.manga && grouped.manga.reduce((a, m) => (m.score > a.score ? m : a), grouped.manga[0]));

        setMediaByType(grouped);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMedias();
  }, []);

  // Posters flottants du hero : le top de chaque catégorie
  const heroPosters = [topFilms, topSeries, topMangas].filter(Boolean);

  // Recommandations : les 5 meilleurs scores toutes catégories confondues
  const recommendations = Object.values(mediaByType)
    .flat()
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const totalCount = Object.values(mediaByType).flat().length;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/media${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  if (loading) {
    return <p className="home-loading">Chargement des médias…</p>;
  }

  return (
    <div className="home-container">
      {/* ===================== HERO ===================== */}
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-badge">+ {totalCount} titres · films · séries · mangas</span>
          <h1 className="hero-title">Films, séries & mangas,<br />réunis au même endroit.</h1>
          <p className="hero-sub">
            Découvrez, notez et gardez la trace de tout ce que vous regardez.
            Créez vos listes de favoris et votre watchlist.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un film, une série, un manga…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">Explorer</button>
          </form>
        </div>

        {heroPosters.length > 0 && (
          <div className="hero-posters">
            {heroPosters.map((media, i) => (
              <a key={media.id} href={`/media/${media.id}`} className={`hero-poster hero-poster-${i}`}>
                <img src={`/img/${media.imageUrl}`} alt={media.title} />
                <span className="hero-poster-title">{media.title}</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ===================== CATÉGORIES ===================== */}
      <section className="section categories-section">
        <h2 className="section-title">Nos catégories</h2>
        <div className="section-rule"></div>
        <div className="categories">
          <div className="category cat-film">
            <div className="category-icon">🎬</div>
            <h3>Films</h3>
            <p>Les derniers blockbusters et les classiques du cinéma.</p>
          </div>
          <div className="category cat-serie">
            <div className="category-icon">📺</div>
            <h3>Séries</h3>
            <p>Des histoires captivantes et des séries incontournables.</p>
          </div>
          <div className="category cat-manga">
            <div className="category-icon">📖</div>
            <h3>Mangas</h3>
            <p>Les mangas populaires et les nouveautés du Japon.</p>
          </div>
        </div>
      </section>

      {/* ===================== RECOMMANDATIONS ===================== */}
      <section className="section recommendations-section">
        <h2 className="section-title">Recommandations populaires</h2>
        <div className="section-rule"></div>
        <div className="recommendations">
          {recommendations.map((media) => (
            <a key={media.id} href={`/media/${media.id}`} className="reco-card">
              <div className="reco-thumb">
                <img src={`/img/${media.imageUrl}`} alt={media.title} />
                <span className="reco-score">{media.score}</span>
              </div>
              <span className="reco-title">{media.title}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
