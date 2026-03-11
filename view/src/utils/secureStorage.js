import CryptoJS from 'crypto-js';

// Clé de chiffrement (à stocker en variable d'environnement en production)
const SECRET_KEY = process.env.REACT_APP_STORAGE_SECRET || 'votre-cle-secrete-changez-moi-en-prod-2026';

/**
 * Chiffre une valeur avant de la stocker
 */
const encrypt = (value) => {
  if (!value) return null;
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
  } catch (error) {
    console.error('Erreur de chiffrement:', error);
    return null;
  }
};

/**
 * Déchiffre une valeur stockée
 */
const decrypt = (encryptedValue) => {
  if (!encryptedValue) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    
    // Si le déchiffrement échoue ou retourne une chaîne vide, retourner null
    if (!decryptedData || decryptedData.length === 0) {
      return null;
    }
    
    return JSON.parse(decryptedData);
  } catch (error) {
    // Erreur silencieuse - les données ne sont probablement pas chiffrées ou corrompues
    return null;
  }
};

/**
 * Stockage sécurisé
 */
export const secureStorage = {
  /**
   * Stocke une valeur de manière sécurisée
   * @param {string} key - Clé de stockage
   * @param {any} value - Valeur à stocker
   * @param {boolean} encrypt - Si true, chiffre la valeur (défaut: true pour données sensibles)
   */
  setItem: (key, value, shouldEncrypt = true) => {
    try {
      if (shouldEncrypt) {
        const encryptedValue = encrypt(value);
        if (encryptedValue) {
          localStorage.setItem(key, encryptedValue);
        }
      } else {
        // Pour les données non sensibles (nom, prénom)
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Erreur de stockage:', error);
    }
  },

  /**
   * Récupère une valeur stockée
   * @param {string} key - Clé de stockage
   * @param {boolean} encrypted - Si true, déchiffre la valeur
   */
  getItem: (key, isEncrypted = true) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      if (isEncrypted) {
        const decrypted = decrypt(item);
        // Si le déchiffrement échoue, supprimer la clé corrompue
        if (decrypted === null) {
          localStorage.removeItem(key);
        }
        return decrypted;
      } else {
        try {
          return JSON.parse(item);
        } catch (e) {
          // Si ce n'est pas du JSON valide, retourner la valeur brute
          // puis la supprimer pour éviter les erreurs futures
          localStorage.removeItem(key);
          return null;
        }
      }
    } catch (error) {
      // Erreur silencieuse - nettoyer la clé problématique
      localStorage.removeItem(key);
      return null;
    }
  },

  /**
   * Supprime une clé du storage
   */
  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  /**
   * Vide complètement le storage (déconnexion)
   */
  clear: () => {
    localStorage.clear();
  },

  /**
   * Stocke les informations de l'utilisateur connecté
   */
  setUserData: (userData, jwtToken) => {
    // Données sensibles chiffrées
    secureStorage.setItem('jwtToken', jwtToken, true);
    secureStorage.setItem('token', userData.token, true);
    secureStorage.setItem('role', userData.role, true);
    secureStorage.setItem('id', userData.id, true);
    
    // Données peu sensibles non chiffrées (optionnel)
    secureStorage.setItem('lastname', userData.lastname, false);
    secureStorage.setItem('firstname', userData.firstname, false);
    secureStorage.setItem('email', userData.email, false);
    
    // Timestamp de connexion pour expiration
    secureStorage.setItem('loginTime', Date.now(), true);
  },

  /**
   * Récupère les informations de l'utilisateur
   */
  getUserData: () => {
    return {
      jwtToken: secureStorage.getItem('jwtToken', true) || null,
      token: secureStorage.getItem('token', true) || null,
      role: secureStorage.getItem('role', true) || null,
      id: secureStorage.getItem('id', true) || null,
      lastname: secureStorage.getItem('lastname', false) || '',
      firstname: secureStorage.getItem('firstname', false) || '',
      email: secureStorage.getItem('email', false) || '',
      loginTime: secureStorage.getItem('loginTime', true) || null,
    };
  },

  /**
   * Vérifie si la session est toujours valide (expiration 24h)
   */
  isSessionValid: () => {
    const loginTime = secureStorage.getItem('loginTime', true);
    if (!loginTime) return false;
    
    const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures
    const now = Date.now();
    
    return (now - loginTime) < SESSION_DURATION;
  },

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    const jwtToken = secureStorage.getItem('jwtToken', true);
    return jwtToken && secureStorage.isSessionValid();
  },

  /**
   * Récupère le JWT token pour les appels API
   */
  getJwtToken: () => {
    return secureStorage.getItem('jwtToken', true);
  },

  /**
   * Récupère le rôle de l'utilisateur
   */
  getUserRole: () => {
    return secureStorage.getItem('role', true);
  }
};

export default secureStorage;
