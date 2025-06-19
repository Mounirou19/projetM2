import React, { useState } from 'react';
import './css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: (localStorage.getItem('lastname') && localStorage.getItem('firstname')) ? localStorage.getItem('lastname') + " " + localStorage.getItem('firstname') : '',
    email: (localStorage.getItem('email')) ? localStorage.getItem('email') : '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer le formulaire via l'API Formspree
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact/create`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message envoyé avec succès');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(true);
      } else {
        alert("Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p>
        Vous avez des questions ou des suggestions ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          disabled={localStorage.getItem('lastname') && localStorage.getItem('firstname')}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={localStorage.getItem('email')}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="subject">Sujet :</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Envoyer</button>
        {isSubmitted && <p className="success-message">Merci pour votre message ! Nous vous contacterons bientôt.</p>}
      </form>
    </div>
  );
};

export default Contact;
