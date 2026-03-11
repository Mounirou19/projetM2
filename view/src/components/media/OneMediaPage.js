import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showSuccess, showError, showWarning } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/OneMediaPage.css';

const OneMediaPage = () => {
  const { id } = useParams(); // Récupère l'ID du média depuis l'URL
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // État pour suivre si le média est en favori

  const userData = secureStorage.getUserData();
  const userId = userData.id;
  const userRole = userData.role;
  const infos = [process.env.REACT_APP_ROLE_USER, userData.token];

  useEffect(() => {
    // Récupérer les informations du média
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media/${id}`, { 
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du média');
        }
        const data = await response.json();
        setMedia(data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    // Vérifier si le média est déjà en favori
    const checkFavoriteStatus = async () => {
      if (userId && userRole === process.env.REACT_APP_ROLE_USER) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/get/${userId}/${id}?infos=${infos}`, { 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la vérification du statut favori');
          }
          const isFav = await response.json();
          setIsFavorite(isFav); // Met à jour l'état en fonction de la réponse (true ou false)
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
      showWarning("Vous devez être connecté avec le rôle approprié pour ajouter ce média aux favoris.");
    }
  };

  if (loading) {
    return <p>Chargement des informations du média...</p>;
  }

  if (!media) {
    return <p>Aucun média trouvé.</p>;
  }

  return (
    <div className="one-media-page">
      <h1>{media.title}</h1>
      <img src={`/img/${media.imageUrl}`} alt={media.title} className="media-detail-image" />
      <p><strong>Type :</strong> {media.type}</p>
      <p><strong>Description :</strong> {media.description}</p>

      {/* Afficher le bouton Ajouter aux favoris si l'utilisateur a le bon rôle */}
      {userId && userRole === process.env.REACT_APP_ROLE_USER && !isFavorite && (
        <button onClick={handleAddToFavorites} className="favorite-button">
          Ajouter aux favoris
        </button>
      )}
      {isFavorite && <p className="favorite-message">Ce média est dans vos favoris</p>}
    </div>
  );
};

export default OneMediaPage;
