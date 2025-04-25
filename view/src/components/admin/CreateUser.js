import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CreateForm.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    role: '',
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/user/create?infos=${infos}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-ADMIN-TOKEN': '35!3J*V5p$5Qf3y6EjzbU£G&' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Utilisateur créé avec succès');
        setFormData({
          lastname: '',
          firstname: '',
          email: '',
          password: '',
          role: '',
        });
      } else {
        alert("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="create-form-container">
      <h1>Créer un Utilisateur</h1>
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
          Mot de passe :
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
            Rôle :
            <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Sélectionner un rôle</option>
                <option value={process.env.REACT_APP_ROLE_ADMIN}>Admin</option>
                <option value={process.env.REACT_APP_ROLE_USER}>Utilisateur</option>
            </select>
        </label>
        <button type="submit">Créer Utilisateur</button>
        <button type="button" onClick={() => navigate('/admin')}>Annuler</button>
      </form>
    </div>
  );
};

export default CreateUser;
