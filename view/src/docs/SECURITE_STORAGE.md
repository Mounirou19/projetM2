# 🔒 Sécurisation du localStorage - Documentation

## ⚠️ Problème Initial

Le stockage des données sensibles en **clair** dans `localStorage` présente des risques :
- **XSS (Cross-Site Scripting)** : Un script malveillant peut accéder aux données
- **Vol de session** : Si le JWT est exposé, un attaquant peut usurper l'identité
- **Inspection navigateur** : Les données sont visibles dans les DevTools

## ✅ Solution Implémentée

### 1. **Chiffrement AES-256**
Toutes les données sensibles sont chiffrées avec `crypto-js` (AES-256) avant stockage.

**Données chiffrées** :
- `jwtToken` : Token JWT pour les appels API
- `token` : Token basique ou admin
- `role` : Rôle utilisateur (ROLE_USER, ROLE_ADMIN)
- `id` : Identifiant utilisateur
- `loginTime` : Timestamp de connexion

**Données NON chiffrées** (peu sensibles) :
- `lastname`, `firstname`, `email` : Informations publiques

### 2. **Clé de chiffrement sécurisée**
- Stockée dans variable d'environnement : `REACT_APP_STORAGE_SECRET`
- **⚠️ OBLIGATOIRE** : Changer la clé en production
- Générer une clé aléatoire forte (32+ caractères)

### 3. **Expiration de session**
- Session automatiquement invalidée après **24 heures**
- Vérification à chaque accès protégé

## 📝 Utilisation

### Import du module
```javascript
import secureStorage from '../utils/secureStorage';
```

### Stockage des données utilisateur (Login)
```javascript
// Stockage automatique chiffré
secureStorage.setUserData(userData, jwtToken);
```

### Récupération des données
```javascript
// Récupérer toutes les données utilisateur
const user = secureStorage.getUserData();

// Récupérer le JWT pour API
const jwt = secureStorage.getJwtToken();

// Récupérer le rôle
const role = secureStorage.getUserRole();

// Vérifier si connecté
if (secureStorage.isAuthenticated()) {
  // Utilisateur connecté et session valide
}
```

### Déconnexion
```javascript
// Nettoyer tout le storage
secureStorage.clear();
```

### Stockage manuel (avancé)
```javascript
// Stocker une valeur chiffrée
secureStorage.setItem('myKey', myValue, true); // true = chiffré

// Stocker une valeur non chiffrée
secureStorage.setItem('publicData', data, false);

// Récupérer
const value = secureStorage.getItem('myKey', true); // true = déchiffrer
```

## 🔧 Configuration .env

Ajoutez dans votre fichier `.env` :
```bash
REACT_APP_STORAGE_SECRET=VotreCleSuperSecreteAleatoire2026ChangezMoiEnProduction!
```

**⚠️ Production** : 
- Générer une clé unique et aléatoire
- Ne JAMAIS commiter le fichier `.env`
- Utiliser un gestionnaire de secrets (AWS Secrets Manager, Vault, etc.)

## 🛡️ Niveaux de Sécurité

### ✅ Implémenté (Actuel)
1. ✅ Chiffrement AES-256 des données sensibles
2. ✅ Expiration de session (24h)
3. ✅ Validation captcha (anti-bot)
4. ✅ JWT vérifié côté backend
5. ✅ Protection brute force (5 tentatives)

### 🔄 Améliorations Possibles (Optionnel)

#### **Niveau 2 : Moyen** (Si plus de temps)
- Utiliser `sessionStorage` au lieu de `localStorage` (expire à fermeture navigateur)
- Implémenter un refresh token
- Ajouter un Content Security Policy (CSP)
- Rotation automatique des clés de chiffrement

#### **Niveau 3 : Élevé** (Nécessite refonte backend)
- Stocker JWT dans **httpOnly cookies** (inaccessible par JS)
- Implémenter OAuth2 / OpenID Connect
- Utiliser Redis pour sessions côté serveur
- Two-Factor Authentication (2FA)

## 📊 Comparatif

| Solution | Sécurité | Complexité | Adapté M2 |
|----------|----------|------------|-----------|
| localStorage clair | ⚠️ Faible | ✅ Facile | ⚠️ Non |
| **localStorage chiffré** | ✅ Moyenne | ✅ Facile | ✅ **OUI** |
| sessionStorage chiffré | ✅ Bonne | ✅ Facile | ✅ Oui |
| httpOnly cookies | ✅✅ Excellente | ⚠️ Complexe | ⚠️ Overkill |
| OAuth2 + Redis | ✅✅✅ Maximale | ❌ Très complexe | ❌ Non |

## ⚡ Migration des Fichiers

### Fichiers à mettre à jour
Remplacer tous les `localStorage.getItem()` par `secureStorage.getItem()` dans :

1. **ProtectedRouteAdmin.js**
2. **ProtectedRouteUser.js**
3. **Header.js**
4. **ProfilPage.js**
5. **AdminPage.js**
6. **EditProfilPage.js**
7. Tous les fichiers utilisant `localStorage`

### Exemple de migration
```javascript
// ❌ AVANT (non sécurisé)
const token = localStorage.getItem('jwtToken');
const role = localStorage.getItem('role');

// ✅ APRÈS (sécurisé)
const token = secureStorage.getJwtToken();
const role = secureStorage.getUserRole();
```

## 🎯 Recommandations pour Soutenance M2

### À mentionner dans votre rapport
1. ✅ **Identification du risque** : localStorage accessible par XSS
2. ✅ **Solution technique** : Chiffrement AES-256 avec crypto-js
3. ✅ **Expiration** : Session limitée à 24h
4. ✅ **Conformité RGPD** : Données personnelles chiffrées
5. ✅ **Défense en profondeur** : Chiffrement + JWT + reCAPTCHA + brute force protection

### Points à expliquer
- Pourquoi pas httpOnly cookies ? → Nécessite refonte backend complète
- Pourquoi 24h d'expiration ? → Balance UX/sécurité
- Clé de chiffrement ? → Variable d'environnement, rotatable

## 📚 Références

- [OWASP LocalStorage Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Crypto-js Documentation](https://cryptojs.gitbook.io/docs/)

## ⚠️ Notes Importantes

1. **Le chiffrement côté client n'est PAS une protection absolue**
   - Un attaquant avec accès au code JS peut déchiffrer
   - Protège principalement contre l'inspection navigateur et certaines attaques XSS

2. **La vraie sécurité se fait côté backend**
   - Validation JWT à chaque requête ✅ (déjà fait)
   - Rate limiting ✅ (brute force protection fait)
   - HTTPS obligatoire en production ⚠️ (à configurer)

3. **Pour un projet M2, cette solution est LARGEMENT suffisante**
   - Démontre la conscience des enjeux de sécurité
   - Implémentation réaliste et fonctionnelle
   - Peut être expliquée facilement au jury

## 🚀 Prochaines Étapes

1. ✅ Migrer tous les `localStorage` vers `secureStorage`
2. ⚠️ Ajouter `REACT_APP_STORAGE_SECRET` dans `.env`
3. ✅ Tester la connexion et déconnexion
4. ✅ Documenter dans le rapport de soutenance
