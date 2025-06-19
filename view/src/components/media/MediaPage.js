import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MediaPage.css';

const MediaPage = () => {
  const [medias, setMedias] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

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
        
        const mediaByType = data.reduce((acc, media) => {
          if (media.status === true) { // Vérifier si le statut est true
            if (!acc[media.type]) {
              acc[media.type] = [];
            }
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
      case 'serie':
        return 'Séries';
      case 'film':
        return 'Films';
      case 'manga':
        return 'Mangas';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <p>Chargement des médias...</p>;
  }

  // Filtrer les catégories pour n'inclure que celles ayant des médias correspondant au terme de recherche
  const filteredCategories = Object.keys(medias).filter((type) => 
    medias[type].some((media) =>
      media.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="media-page">
      <h1>Liste des Médias</h1>

      {/* Barre de recherche */}
      <input 
        type="text" 
        placeholder="Rechercher un média par nom..." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-bar"
      />

      {/* Affichage du message si aucun média ne correspond */}
      {filteredCategories.length === 0 ? (
        <p>Aucun média ne correspond à votre recherche.</p>
      ) : (
        filteredCategories.map((type) => (
          <div key={type} className="media-section">
            <h2>{formatType(type)}</h2>
            <ul>
              {medias[type]
                .filter((media) => 
                  media.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtre par terme de recherche
                )
                .map((media) => (
                  <li key={media.id} className="media-item">
                    <Link to={`/media/${media.id}`}>
                      <img src={`/img/${media.imageUrl}`} alt={media.title} className="media-image" />
                      <h3>{media.title}</h3>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MediaPage;
