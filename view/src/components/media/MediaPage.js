import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MediaPage.css';

const MediaPage = () => {
  const [medias, setMedias] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des médias');
        const data = await response.json();
        const mediaByType = data.reduce((acc, media) => {
          if (media.status === true) {
            if (!acc[media.type]) acc[media.type] = [];
            acc[media.type].push(media);
          }
          return acc;
        }, {});
        setMedias(mediaByType);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMedias();
  }, []);

  const formatType = (type) => {
    switch (type) {
      case 'serie': return 'Séries';
      case 'film': return 'Films';
      case 'manga': return 'Mangas';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  if (loading) return <p className="media-loading">Chargement des médias…</p>;

  const allTypes = Object.keys(medias);
  const visibleTypes = (activeType === 'all' ? allTypes : [activeType]).filter((type) =>
    medias[type] && medias[type].some((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="media-page">
      <header className="media-head">
        <div>
          <h1>Catalogue</h1>
          <p>Parcourez l'ensemble des films, séries et mangas.</p>
        </div>
        <div className="media-search">
          <span className="media-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un média par nom…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="media-filters">
        <button className={activeType === 'all' ? 'chip chip-on' : 'chip'} onClick={() => setActiveType('all')}>Tout</button>
        {allTypes.map((type) => (
          <button key={type} className={activeType === type ? 'chip chip-on' : 'chip'} onClick={() => setActiveType(type)}>
            {formatType(type)}
          </button>
        ))}
      </div>

      {visibleTypes.length === 0 ? (
        <p className="media-empty">Aucun média ne correspond à votre recherche.</p>
      ) : (
        visibleTypes.map((type) => {
          const items = medias[type].filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()));
          return (
            <section key={type} className="media-section">
              <div className="media-section-head">
                <h2>{formatType(type)}</h2>
                <span className="media-count">{items.length}</span>
              </div>
              <div className="media-grid">
                {items.map((media) => (
                  <Link key={media.id} to={`/media/${media.id}`} className="media-card">
                    <div className="media-thumb">
                      <img src={`/img/${media.imageUrl}`} alt={media.title} />
                      {media.score != null && <span className="media-score">★ {media.score}</span>}
                    </div>
                    <h3>{media.title}</h3>
                    <span className="media-type">{formatType(media.type)}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
};

export default MediaPage;
