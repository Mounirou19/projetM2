import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/SeeContact.css';

function SeeContact() {
  const { id } = useParams(); // Récupère l'ID du contact depuis l'URL
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  
  const infos = [process.env.REACT_APP_ROLE_ADMIN, process.env.REACT_APP_TOKEN]; // Infos d'authentification si nécessaires

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contact/${id}?infos=${infos}`, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du contact");
      }
      
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la récupération du contact");
    }
  };

  return (
    <div>
      <h1>Détails du Contact</h1>
      {contact ? (
        <div>
          <p><strong>ID:</strong> {contact.id}</p>
          <p><strong>Nom:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Message:</strong> {contact.message}</p>
          <p><strong>Date de Création:</strong> {contact.createdAt}</p>
          <p><strong>Status:</strong> {contact.status === false ? "Lu" : "Non lu"}</p>
          <button onClick={() => navigate("/admin")}>Retour sur la page admin</button>
        </div>
      ) : (
        <p>Chargement des informations du contact...</p>
      )}
    </div>
  );
}

export default SeeContact;
