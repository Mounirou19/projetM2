import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/CreateForm.css';

const EditProfilPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
  });
  const userData = secureStorage.getUserData();
  const infos = [process.env.REACT_APP_ROLE_USER, userData.token];

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis l'API
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profil/${id}?infos=${infos}`, { 
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        });
        const data = await response.json();
        setFormData({
          lastname: data.lastname,
          firstname: data.firstname,
          email: data.email,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profil/user/edit/${id}?infos=${infos}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Mettre à jour les données utilisateur dans secureStorage
        const updatedUserData = {
          ...userData,
          lastname: formData.lastname,
          firstname: formData.firstname,
          email: formData.email
        };
        secureStorage.setItem('lastname', formData.lastname, false);
        secureStorage.setItem('firstname', formData.firstname, false);
        secureStorage.setItem('email', formData.email, false);
        showSuccess('Utilisateur mis à jour avec succès');
        navigate('/profil');
      } else {
        showError("Erreur lors de la mise à jour de l'utilisateur");
      }
    } catch (error) {
      console.error('Erreur:', error);
      showError("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  return (
    <div className="create-form-container">
      <h1>Modifier mon profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom :
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </label>
        <label>
          Prénom :
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>
        <label>
          Email :
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={() => navigate('/profil')}>Annuler</button>
      </form>
    </div>
  );
};

export default EditProfilPage;
