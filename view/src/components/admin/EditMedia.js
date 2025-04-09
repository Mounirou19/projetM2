import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CreateForm.css';

const EditMedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    imageUrl: '',
    description: '',
  });
  const infos = [process.env.REACT_APP_ROLE_ADMIN ,process.env.REACT_APP_TOKEN];

  useEffect(() => {
    // Récupérer les données du média depuis l'API
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/${id}?infos=${infos}`);
        const data = await response.json();
        setFormData({
          title: data.title,
          type: data.type,
          imaageUrl: data.imageUrl,
          description: data.description,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données du média', error);
      }
    };
    fetchMedia();
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/media/update/${id}?infos=${infos}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Média mis à jour avec succès');
        navigate('/admin');
      } else {
        alert("Erreur lors de la mise à jour du média");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la mise à jour du média");
    }
  };

  return (
    <div className="create-form-container">
      <h1>Modifier Média</h1>
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
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={() => navigate('/admin')}>Annuler</button>
      </form>
    </div>
  );
};

export default EditMedia;
