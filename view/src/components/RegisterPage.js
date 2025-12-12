import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm, { RgpdPolicyModal } from './RegisterForm';
import './css/Auth.css';

/**
 * Page d'inscription avec logique métier
 * Gère les états, validations et appels API
 * 
 * @author Mounirou
 * @version 2.0 - Sécurité renforcée et conformité RGPD
 */
const Register = () => {
    // Navigation
    const navigate = useNavigate();

    // État du formulaire
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rgpdConsent: false
    });

    // États pour l'interface
    const [errors, setErrors] = useState({});
    const [showRgpdModal, setShowRgpdModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    /**
     * Validation du mot de passe en temps réel
     * Critères : min 8 caractères, majuscule, minuscule, chiffre, caractère spécial
     */
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);

        const strength = [minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar]
            .filter(Boolean).length;

        if (strength < 3) return 'Faible';
        if (strength < 5) return 'Moyen';
        return 'Fort';
    };

    /**
     * Gestion du changement des champs du formulaire
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Validation en temps réel du mot de passe
        if (name === 'password') {
            setPasswordStrength(validatePassword(value));
        }

        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    /**
     * Validation côté client avant soumission
     */
    const validateForm = () => {
        const newErrors = {};

        // Validation nom et prénom
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Le prénom est requis';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Le nom est requis';
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        // Validation mot de passe
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
            newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial';
        }

        // Validation confirmation mot de passe
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        // Validation consentement RGPD
        if (!formData.rgpdConsent) {
            newErrors.rgpdConsent = 'Vous devez accepter la politique de confidentialité';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Soumission du formulaire d'inscription
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        // Validation côté client
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                lastName: formData.lastName,
                firstName: formData.firstName,
                email: formData.email,
                password: formData.password,
                rgpdConsent: formData.rgpdConsent
            });

            if (response.data.status === 'success') {
                setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                
                // Réinitialisation du formulaire
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    rgpdConsent: false
                });
                setPasswordStrength('');

                // Redirection vers la page de connexion après 2 secondes
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                // Erreurs du serveur avec détails
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setErrors({ 
                        general: error.response.data.message || 'Une erreur est survenue lors de l\'inscription'
                    });
                }
            } else {
                setErrors({ 
                    general: 'Erreur de connexion au serveur. Veuillez réessayer.' 
                });
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
      <RegisterForm 
        formData={formData}
        errors={errors}
        loading={loading}
        successMessage={successMessage}
        passwordStrength={passwordStrength}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onShowRgpdModal={() => setShowRgpdModal(true)}
      />
      
      {/* Modal de politique de confidentialité */}
      {showRgpdModal && (
        <RgpdPolicyModal onClose={() => setShowRgpdModal(false)} />
      )}
    </>
  );
};

export default Register;
