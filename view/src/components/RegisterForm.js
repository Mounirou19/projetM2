import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// import '../css/RegisterForm.css';

/**
 * Composant RegisterForm - Formulaire d'inscription (présentation uniquement)
 * La logique est gérée par le composant parent (RegisterPage)
 * 
 * @author Mounirou
 * @version 2.0 - Sécurité renforcée et conformité RGPD
 */
function RegisterForm({ 
    formData, 
    errors, 
    loading, 
    successMessage, 
    passwordStrength,
    captchaToken,
    recaptchaRef,
    handleChange, 
    handleSubmit,
    onShowRgpdModal,
    onCaptchaChange
}) {
    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Créer un compte</h1>
                <p className="register-subtitle">Rejoignez CinéManga gratuitement</p>

                {/* Message de succès */}
                {successMessage && (
                    <div className="success-message">
                        ✅ {successMessage}
                    </div>
                )}

                {/* Message d'erreur général */}
                {errors.general && (
                    <div className="error-message-general">
                        ❌ {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    {/* Prénom */}
                    <div className="form-group">
                        <label htmlFor="firstName">Prénom *</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'input-error' : ''}
                            placeholder="Votre prénom"
                            required
                            disabled={loading}
                        />
                        {errors.firstName && (
                            <span className="error-message">{errors.firstName}</span>
                        )}
                    </div>

                    {/* Nom */}
                    <div className="form-group">
                        <label htmlFor="lastName">Nom *</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'input-error' : ''}
                            placeholder="Votre nom"
                            required
                            disabled={loading}
                        />
                        {errors.lastName && (
                            <span className="error-message">{errors.lastName}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Adresse email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                            placeholder="votre.email@exemple.com"
                            required
                            disabled={loading}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            placeholder="Min. 8 caractères, majuscule, chiffre, caractère spécial"
                            required
                            disabled={loading}
                        />
                        {formData.password && (
                            <div className={`password-strength strength-${passwordStrength.toLowerCase()}`}>
                                Force du mot de passe : <strong>{passwordStrength}</strong>
                            </div>
                        )}
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                        <small className="form-hint">
                            Le mot de passe doit contenir : 8 caractères minimum, une majuscule, 
                            une minuscule, un chiffre et un caractère spécial (@$!%*?&)
                        </small>
                    </div>

                    {/* Confirmation mot de passe */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'input-error' : ''}
                            placeholder="Retapez votre mot de passe"
                            required
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Consentement RGPD */}
                    <div className="form-group rgpd-consent">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="rgpdConsent"
                                checked={formData.rgpdConsent}
                                onChange={handleChange}
                                className={errors.rgpdConsent ? 'checkbox-error' : ''}
                                required
                                disabled={loading}
                            />
                            <span>
                                J'accepte la{' '}
                                <button 
                                    type="button" 
                                    className="link-button"
                                    onClick={onShowRgpdModal}
                                >
                                    politique de confidentialité
                                </button>
                                {' '}et le traitement de mes données personnelles conformément au RGPD *
                            </span>
                        </label>
                        {errors.rgpdConsent && (
                            <span className="error-message">{errors.rgpdConsent}</span>
                        )}
                    </div>

                    {/* Google reCAPTCHA */}
                    <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                            onChange={onCaptchaChange}
                            onExpired={() => onCaptchaChange('')}
                        />
                    </div>

                    {/* Bouton de soumission */}
                    <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={loading || !captchaToken}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Inscription en cours...
                            </>
                        ) : (
                            'S\'inscrire'
                        )}
                    </button>

                    {/* Lien vers la connexion */}
                    <p className="form-footer">
                        Vous avez déjà un compte ?{' '}
                        <a href="/login" className="link">Se connecter</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

/**
 * Composant Modal pour afficher la politique de confidentialité
 * @export pour pouvoir l'utiliser dans RegisterPage
 */
export function RgpdPolicyModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Politique de Confidentialité - RGPD</h2>
                    <button className="btn-close" onClick={onClose} aria-label="Fermer">
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    <h3>🔐 Protection de vos données</h3>
                    <p>
                        CinéManga s'engage à protéger vos données personnelles conformément 
                        au Règlement Général sur la Protection des Données (RGPD).
                    </p>

                    <h4>Données collectées :</h4>
                    <ul>
                        <li>Nom et prénom</li>
                        <li>Adresse email (authentification)</li>
                        <li>Mot de passe (haché avec bcrypt)</li>
                        <li>Adresse IP et date de connexion (sécurité)</li>
                        <li>Préférences (favoris)</li>
                    </ul>

                    <h4>Finalités du traitement :</h4>
                    <ul>
                        <li>Gestion de votre compte utilisateur</li>
                        <li>Authentification et sécurité</li>
                        <li>Personnalisation de l'expérience</li>
                        <li>Statistiques anonymisées</li>
                    </ul>

                    <h4>Vos droits RGPD :</h4>
                    <ul>
                        <li>✅ Droit d'accès : Consulter vos données</li>
                        <li>✅ Droit de rectification : Modifier vos informations</li>
                        <li>✅ Droit à l'effacement : Supprimer votre compte</li>
                        <li>✅ Droit à la portabilité : Exporter vos données</li>
                        <li>✅ Droit d'opposition : Refuser certains traitements</li>
                    </ul>

                    <h4>Sécurité :</h4>
                    <p>
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                        pour protéger vos données contre tout accès non autorisé :
                    </p>
                    <ul>
                        <li>Chiffrement des mots de passe (bcrypt coût 12)</li>
                        <li>Authentification JWT sécurisée</li>
                        <li>Protection contre le brute force (verrouillage après 5 tentatives)</li>
                        <li>Logs d'audit pour traçabilité</li>
                    </ul>

                    <h4>Contact :</h4>
                    <p>
                        Pour exercer vos droits ou toute question relative à vos données personnelles :
                        <br />
                        📧 <strong>mounirou.cisse@ensitech.eu</strong>
                    </p>

                    <p className="modal-footer-text">
                        <small>
                            <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer">
                                📄 Consulter la politique de confidentialité complète
                            </a>
                        </small>
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-primary" onClick={onClose}>
                        J'ai compris
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
