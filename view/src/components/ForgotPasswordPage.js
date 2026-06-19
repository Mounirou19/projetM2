import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';
import './css/Auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setSent(true);
        showSuccess('Email envoyé si le compte existe !');
      } else {
        showError(data.message || 'Une erreur est survenue');
      }
    } catch {
      showError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split">
      <aside className="auth-brand">
        <div className="auth-brand-logo">
          <span className="auth-brand-mark">C</span>
          <span>CinéManga</span>
        </div>
        <div className="auth-brand-copy">
          <h2>Mot de passe oublié ?</h2>
          <p>Pas de panique, on vous envoie un lien de réinitialisation.</p>
        </div>
        <div className="auth-brand-foot">★★★★★ <span>+ 12 000 cinéphiles</span></div>
      </aside>

      <main className="auth-panel">
        <div className="auth-panel-inner">
          <h1 className="auth-title">Réinitialiser le mot de passe</h1>

          {sent ? (
            <div>
              <p className="auth-subtitle">
                Si un compte est associé à <strong>{email}</strong>, vous recevrez un email sous peu avec un lien valable <strong>1 heure</strong>.
              </p>
              <button className="auth-submit" onClick={() => navigate('/login')}>
                Retour à la connexion
              </button>
            </div>
          ) : (
            <>
              <p className="auth-subtitle">Saisissez votre adresse email pour recevoir le lien.</p>
              <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="vous@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Envoi en cours…' : 'Envoyer le lien'}
                </button>
              </form>
              <p className="switch-auth">
                <a href="/login">← Retour à la connexion</a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
