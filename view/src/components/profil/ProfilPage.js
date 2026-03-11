import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/Profile.css';

const Profile = () => {
  const userData = secureStorage.getUserData();
  const id = userData.id;
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const infos = [process.env.REACT_APP_ROLE_USER, userData.token];

  useEffect(() => {
    const name = `${userData.firstname} ${userData.lastname}` || 'John Doe';
    const email = userData.email || 'johndoe@example.com';
    const role = userData.role ? 'Utilisateur' : 'Pas de rôle';

    setUser({ name, email, role });

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/user/${id}?infos=${infos}`, { 
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des médias favoris');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [id]);

  const handleEditProfile = () => {
    navigate(`/profil/edit/${id}`);
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
      setLoading(true);
      try {
        // Simulation d'un délai de 5-7 secondes
        await new Promise((resolve) => setTimeout(resolve, 5000));
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete/profil/${id}?infos=${infos}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        });
        
        if (response.ok) {
          showSuccess('Profil supprimé avec succès');
          secureStorage.clear();
          window.location.href = '/';
        } else {  
          showError('Erreur lors de la suppression du profil');
        }
      }
      catch (error) {
        console.error('Erreur lors de la suppression du profil:', error);
        showError('Erreur lors de la suppression du profil');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteFavorite = async (mediaId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/delete/${mediaId}?infos=${infos}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
      });

      if (response.ok) {
        showSuccess('Favori supprimé avec succès');
        setFavorites(favorites.filter((favorite) => favorite.id_profil !== mediaId));
      } else {
        showError("Erreur lors de la suppression du favori");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du favori:', error);
      showError("Erreur lors de la suppression du favori");
    }
  };

  return (
    <div className="profile-container">
      <h1>Mon Profil</h1>
      <div className="profile-info">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
      </div>
      <div className="profile-actions">
        <button onClick={handleEditProfile}>Modifier le profil</button>
        <button onClick={handleDeleteProfile} disabled={loading}>
          {loading ? 'Suppression en cours...' : 'Supprimer le profil'}
        </button>
      </div>

      <div className="favorites-section">
        <h2>Médias Favoris</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((media) => (
              <li key={media.id_profil} className="favorite-item">
                <Link to={`/media/${media.id}`}>
                  <img src={`/img/${media.imageUrl}`} alt={media.title} />
                  <h3>{media.title}</h3>
                </Link>
                <button onClick={() => handleDeleteFavorite(media.id_profil)}>Supprimer</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Vous n'avez aucun média en favoris.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;