import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CreateForm.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    role: '',
  });
  const infos = [process.env.REACT_APP_ROLE_ADMIN ,process.env.REACT_APP_TOKEN];

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis l'API
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/${id}?infos=${infos}`);
        const data = await response.json();
        setFormData({
          lastname: data.lastname,
          firstname: data.firstname,
          email: data.email,
          role: data.role,
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/update/${id}?infos=${infos}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-ADMIN-TOKEN': `${process.env.REACT_APP_ADMIN_ACCESS_TOKEN}`, 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Utilisateur mis à jour avec succès');
        navigate('/admin');
      } else {
        alert("Erreur lors de la mise à jour de l'utilisateur");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  return (
    <div className="create-form-container">
      <h1>Modifier Utilisateur</h1>
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
        <label>
            Rôle :
            <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Sélectionner un rôle</option>
                <option value={process.env.REACT_APP_ROLE_ADMIN}>Admin</option>
                <option value={process.env.REACT_APP_ROLE_USER}>Utilisateur</option>
            </select>
        </label>
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={() => navigate('/admin')}>Annuler</button>
      </form>
    </div>
  );
};

export default EditUser;
