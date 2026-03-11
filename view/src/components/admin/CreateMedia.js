import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showSuccess, showError } from '../../utils/toast';
import secureStorage from '../../utils/secureStorage';
import '../css/CreateForm.css';

const CreateMedia = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    imageUrl: '',
    description: '',
  });
  const navigate = useNavigate();
  const infos = [process.env.REACT_APP_ROLE_ADMIN ,process.env.REACT_APP_TOKEN];

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/create?infos=${infos}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${secureStorage.getJwtToken()}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccess('Média créé avec succès');
        setFormData({
          title: '',
          type: '',
            imageUrl: '',
          description: '',
        });
      } else {
        showError('Erreur lors de la création du média');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showError('Erreur lors de la création du média');
    }
  };

  return (
    <div className="create-form-container">
      <h1>Créer un Média</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titre :
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
            Type :
            <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Sélectionnez un type</option>
                <option value="film">Film</option>
                <option value="serie">Série</option>
                <option value="manga">Manga</option>
            </select>
        </label>
        <label>
          Image URL :
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </label>
        <label>
          Description :
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit">Créer Média</button>
        <button type="button" onClick={() => navigate('/admin')}>Annuler</button>
      </form>
    </div>
  );
};

export default CreateMedia;
