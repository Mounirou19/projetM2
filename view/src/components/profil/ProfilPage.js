import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/Profile.css';

const Profile = () => {
  const userData = secureStorage.getUserData();
  const id = userData.id;
  const [user, setUser] = useState({ name: '', email: '', role: '' });
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
        if (!response.ok) throw new Error('Erreur lors de la récupération des médias favoris');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, [id]);

  const handleEditProfile = () => { navigate(`/profil/edit/${id}`); };

  const handleDeleteProfile = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
      setLoading(true);
      try {
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
      } catch (error) {
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

  const initials = (user.name || '?').trim().split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase();

  return (
    <div className="profile-container">
      {/* En-tête de profil */}
      <header className="profile-header">
        <div className="profile-avatar">{initials || '?'}</div>
        <div className="profile-identity">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="profile-role">{user.role}</span>
        </div>
        <div className="profile-actions">
          <button className="profile-btn-edit" onClick={handleEditProfile}>Modifier le profil</button>
          <button className="profile-btn-delete" onClick={handleDeleteProfile} disabled={loading}>
            {loading ? 'Suppression…' : 'Supprimer'}
          </button>
        </div>
      </header>

      {/* Favoris */}
      <section className="favorites-section">
        <div className="favorites-head">
          <h2>Mes favoris</h2>
          <span className="favorites-count">{favorites.length}</span>
        </div>
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map((media) => (
              <div key={media.id_profil} className="favorite-card">
                <Link to={`/media/${media.id}`} className="favorite-link">
                  <div className="favorite-thumb">
                    <img src={`/img/${media.imageUrl}`} alt={media.title} />
                  </div>
                  <h3>{media.title}</h3>
                </Link>
                <button className="favorite-remove" onClick={() => handleDeleteFavorite(media.id_profil)} aria-label="Retirer des favoris">✕</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <p>Vous n'avez aucun média en favoris.</p>
            <Link to="/media" className="favorites-cta">Parcourir le catalogue</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
