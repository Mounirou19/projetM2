import React, { useState } from 'react';
import { showSuccess, showError } from '../utils/toast';
import secureStorage from '../utils/secureStorage';
import './css/Contact.css';

const Contact = () => {
  const userData = secureStorage.getUserData();
  const [formData, setFormData] = useState({
    name: (userData.lastname && userData.firstname) ? userData.lastname + " " + userData.firstname : '',
    email: userData.email || '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        showSuccess('Message envoyé avec succès');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(true);
      } else {
        showError("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Erreur:', error);
      showError("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        {/* Panneau d'info */}
        <aside className="contact-aside">
          <div className="contact-aside-mark">C</div>
          <h2>Une question ?<br />Parlons-en.</h2>
          <p>Des suggestions, un bug, une œuvre à ajouter au catalogue ? On vous répond dans les plus brefs délais.</p>
          <div className="contact-aside-item"><span>✉</span> mounirou.cisse@ensitech.eu</div>
          <div className="contact-aside-item"><span>⌚</span> Réponse sous 24–48 h</div>
        </aside>

        {/* Formulaire */}
        <div className="contact-form-wrap">
          <h1>Contactez-nous</h1>
          <p className="contact-intro">Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="name">Nom</label>
                <input
                  type="text" id="name" name="name"
                  disabled={userData.lastname && userData.firstname}
                  value={formData.name} onChange={handleChange} required
                />
              </div>
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email" id="email" name="email"
                  disabled={!!userData.email}
                  value={formData.email} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Sujet</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            <button type="submit" className="contact-submit">Envoyer le message</button>
            {isSubmitted && <p className="success-message">Merci pour votre message ! Nous vous contacterons bientôt.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
