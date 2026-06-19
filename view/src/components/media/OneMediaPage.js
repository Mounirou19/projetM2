import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showSuccess, showError, showWarning } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/OneMediaPage.css';

const OneMediaPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Affichage : lecteur (streaming à venir) + synopsis
  const [showPlayer, setShowPlayer] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const userData = secureStorage.getUserData();
  const userId = userData.id;
  const userRole = userData.role;
  const infos = [process.env.REACT_APP_ROLE_USER, userData.token];

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media/${id}`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Erreur lors de la récupération des informations du média');
        const data = await response.json();
        setMedia(data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const checkFavoriteStatus = async () => {
      if (userId && userRole === process.env.REACT_APP_ROLE_USER) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/get/${userId}/${id}?infos=${infos}`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
          });
          if (!response.ok) throw new Error('Erreur lors de la vérification du statut favori');
          const isFav = await response.json();
          setIsFavorite(isFav);
        } catch (error) {
          console.error('Erreur lors de la vérification du statut favori:', error);
        }
      }
    };

    fetchMedia();
    checkFavoriteStatus();
  }, [id, userId, userRole]);

  const handleAddToFavorites = async () => {
    if (userId && userRole === process.env.REACT_APP_ROLE_USER) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/create/${userId}/${id}?infos=${infos}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        });
        if (response.ok) {
          showSuccess('Média ajouté aux favoris avec succès');
          window.location.href = '/profil';
        } else {
          showError("Erreur lors de l'ajout du média aux favoris");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris:", error);
        showError("Erreur lors de l'ajout du média aux favoris");
      }
    } else {
      showWarning('Vous devez être connecté avec le rôle approprié pour ajouter ce média aux favoris.');
    }
  };

  // "Regarder le film" — ne lance rien pour l'instant (streaming à venir)
  const handleWatch = () => {
    setShowPlayer(true);
    setShowDesc(false);
  };

  const formatType = (type) => {
    switch (type) {
      case 'serie': return 'Série';
      case 'film': return 'Film';
      case 'manga': return 'Manga';
      default: return type;
    }
  };

  if (loading) return <p className="onemedia-loading">Chargement des informations du média…</p>;
  if (!media) return <p className="onemedia-loading">Aucun média trouvé.</p>;

  const isUser = userId && userRole === process.env.REACT_APP_ROLE_USER;

  return (
    <div className="onemedia-page">
      {/* Hero immersif : affiche en avant */}
      <div className="onemedia-hero">
        <div className="onemedia-hero-bg" style={{ backgroundImage: `url(/img/${media.imageUrl})` }}></div>
        <div className="onemedia-hero-inner">
          <div className="onemedia-poster">
            <img src={`/img/${media.imageUrl}`} alt={media.title} />
          </div>
          <div className="onemedia-info">
            <span className="onemedia-badge">{formatType(media.type)}</span>
            <h1>{media.title}</h1>
            <div className="onemedia-meta">
              {media.score != null && <span className="onemedia-score">★ {media.score}</span>}
              {media.score != null && <span className="onemedia-meta-sep">/ 10</span>}
              <span className="onemedia-meta-type">{formatType(media.type)}</span>
            </div>

            <div className="onemedia-actions">
              <button className="btn-watch" onClick={handleWatch}>
                <span className="play-tri">▶</span> Regarder le film
              </button>
              <button className="btn-desc" onClick={() => setShowDesc((v) => !v)}>
                {showDesc ? 'Masquer la description' : 'Voir la description'}
              </button>

              {/* Logique favoris — utilisateur connecté uniquement (inchangée) */}
              {isUser && !isFavorite && (
                <button className="favorite-button" onClick={handleAddToFavorites}>♡ Ajouter aux favoris</button>
              )}
              {isFavorite && (
                <button className="favorite-button is-fav" disabled>♥ Dans vos favoris</button>
              )}
            </div>

            {isFavorite && <p className="favorite-message">✓ Ce média fait partie de vos favoris</p>}
          </div>
        </div>
      </div>

      {/* Lecteur + synopsis */}
      <div className="onemedia-content">
        {showPlayer && (
          <div className="onemedia-player">
            <button className="player-close" onClick={() => setShowPlayer(false)} aria-label="Fermer">✕</button>
            <div className="player-play">▶</div>
            <div className="player-text">Lecture de « {media.title} »</div>
            <div className="player-sub">Le streaming sera bientôt disponible.</div>
          </div>
        )}

        {showDesc && (
          <div className="onemedia-synopsis">
            <h2>Synopsis</h2>
            <p>{media.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneMediaPage;
