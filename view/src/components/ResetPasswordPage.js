import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showSuccess, showError } from '../utils/toast';
import './css/Auth.css';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState('');

  useEffect(() => {
    if (!token) {
      showError('Lien invalide ou manquant');
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const evaluateStrength = (pwd) => {
    const checks = [
      pwd.length >= 8,
      /[A-Z]/.test(pwd),
      /[a-z]/.test(pwd),
      /\d/.test(pwd),
      /[@$!%*?&]/.test(pwd),
    ];
    const score = checks.filter(Boolean).length;
    if (score < 3) return 'Faible';
    if (score < 5) return 'Moyen';
    return 'Fort';
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setStrength(evaluateStrength(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      showError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        showSuccess('Mot de passe réinitialisé ! Vous pouvez vous connecter.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        showError(data.message || 'Une erreur est survenue');
        if (data.message?.includes('expiré')) {
          setTimeout(() => navigate('/forgot-password'), 3000);
        }
      }
    } catch {
      showError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const strengthColor = { Faible: '#e74c3c', Moyen: '#f39c12', Fort: '#27ae60' };

  return (
    <div className="auth-split">
      <aside className="auth-brand">
        <div className="auth-brand-logo">
          <span className="auth-brand-mark">C</span>
          <span>CinéManga</span>
        </div>
        <div className="auth-brand-copy">
          <h2>Nouveau mot de passe</h2>
          <p>Choisissez un mot de passe fort pour sécuriser votre compte.</p>
        </div>
        <div className="auth-brand-foot">★★★★★ <span>+ 12 000 cinéphiles</span></div>
      </aside>

      <main className="auth-panel">
        <div className="auth-panel-inner">
          <h1 className="auth-title">Nouveau mot de passe</h1>
          <p className="auth-subtitle">Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="password">Nouveau mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {strength && (
              <p style={{ color: strengthColor[strength], fontSize: '0.85rem', marginTop: '-8px' }}>
                Force : {strength}
              </p>
            )}

            <label htmlFor="confirm">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirm"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Réinitialisation…' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
