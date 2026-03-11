# 📋 POLITIQUE DE CONFIDENTIALITÉ - CinéManga

**Dernière mise à jour : 12 décembre 2025**

---

## 1. 👥 Responsable du traitement des données

**Nom de la plateforme** : CinéManga  
**Type de projet** : Projet Master 2 en Développement Informatique  
**Responsable** : Mounirou CISSE  
**Contact** : mounirou.cisse@ensitech.eu  
**Adresse** : ENSITECH, France

---

## 2. 📊 Données collectées

### 2.1 Données personnelles obligatoires

Lors de votre inscription sur CinéManga, nous collectons les informations suivantes :

| Donnée | Type | Finalité | Base légale |
|--------|------|----------|-------------|
| **Nom** | Identité | Personnalisation du compte | Consentement |
| **Prénom** | Identité | Personnalisation du compte | Consentement |
| **Adresse email** | Contact | Authentification et communication | Contrat |
| **Mot de passe** | Sécurité | Authentification sécurisée (haché) | Contrat |
| **Date de création** | Traçabilité | Historique du compte | Obligation légale (RGPD) |

### 2.2 Données collectées automatiquement

Pour assurer la sécurité de votre compte, nous collectons automatiquement :

| Donnée | Finalité | Durée de conservation |
|--------|----------|----------------------|
| **Adresse IP de connexion** | Sécurité anti-fraude, géolocalisation | 12 mois maximum |
| **Date et heure de connexion** | Audit de sécurité, traçabilité | 12 mois maximum |
| **Tentatives de connexion échouées** | Protection contre le brute force | Réinitialisé après connexion réussie |
| **Navigateur et appareil** | Compatibilité technique | Session uniquement |

### 2.3 Données d'utilisation

| Donnée | Type | Finalité |
|--------|------|----------|
| **Liste de favoris** | Préférences | Personnalisation de l'expérience |
| **Historique de consultation** | Comportement | Recommandations (optionnel) |
| **Messages de contact** | Communication | Support utilisateur |

---

## 3. 🎯 Finalités du traitement

### 3.1 Finalités principales

✅ **Gestion de votre compte utilisateur**
- Création et authentification du compte
- Accès aux fonctionnalités de la plateforme
- Modification de vos informations personnelles

✅ **Sécurité et protection**
- Protection contre les tentatives de piratage (brute force)
- Détection et prévention des fraudes
- Verrouillage temporaire en cas d'activité suspecte
- Traçabilité des actions pour audit de sécurité

✅ **Personnalisation de l'expérience**
- Gestion de vos médias favoris (films, séries, mangas)
- Recommandations basées sur vos préférences
- Historique de consultation

✅ **Communication**
- Réponse à vos demandes via le formulaire de contact
- Notifications importantes relatives à votre compte (optionnel)
- Information sur les mises à jour majeures de la plateforme

### 3.2 Finalités secondaires

📊 **Statistiques anonymisées**
- Analyse d'utilisation de la plateforme
- Amélioration de l'ergonomie et des fonctionnalités
- Rapports agrégés (aucune donnée personnelle identifiable)

🔒 **Conformité légale**
- Respect des obligations légales (RGPD, CNIL)
- Conservation des logs pour audit en cas de litige
- Réponse aux demandes des autorités compétentes

---

## 4. ⚖️ Base légale du traitement

Conformément au RGPD (Règlement Général sur la Protection des Données), nous traitons vos données sur les bases légales suivantes :

| Base légale | Application |
|-------------|-------------|
| **Consentement explicite** | Inscription volontaire, acceptation de la politique de confidentialité |
| **Exécution du contrat** | Fourniture du service CinéManga (authentification, gestion favoris) |
| **Intérêt légitime** | Sécurité du compte, prévention de la fraude, amélioration du service |
| **Obligation légale** | Conservation des logs pour traçabilité RGPD, réponse aux autorités |

---

## 5. ⏱️ Durée de conservation des données

### 5.1 Données actives

| Type de donnée | Durée de conservation |
|----------------|----------------------|
| **Compte actif** | Tant que le compte est actif et utilisé |
| **Favoris et préférences** | Tant que le compte est actif |
| **Messages de contact traités** | 2 ans maximum après traitement |

### 5.2 Données de sécurité

| Type de donnée | Durée de conservation |
|----------------|----------------------|
| **Logs de connexion (IP, date)** | 12 mois maximum (RGPD) |
| **Tentatives échouées** | Réinitialisé après connexion réussie ou après 15 minutes de verrouillage |
| **Logs d'audit de sécurité** | 12 mois maximum |

### 5.3 Compte inactif ou supprimé

| Situation | Action |
|-----------|--------|
| **Inactivité > 3 ans** | Email de relance → Suppression automatique après 6 mois sans réponse |
| **Demande de suppression** | Anonymisation immédiate des données personnelles |
| **Compte désactivé** | Conservation 30 jours pour récupération → Anonymisation définitive |

### 5.4 Données anonymisées

Les **statistiques anonymisées** (nombre total d'utilisateurs, tendances générales) peuvent être conservées **indéfiniment** car elles ne permettent **aucune identification personnelle**.

---

## 6. 🔐 Sécurité des données

### 6.1 Mesures techniques de protection

✅ **Chiffrement des mots de passe**
- Algorithme bcrypt avec un coût de 12
- Aucun stockage en clair du mot de passe
- Impossibilité de récupération (reset uniquement)

✅ **Authentification sécurisée**
- Tokens JWT (JSON Web Tokens) signés avec algorithme RS256
- Expiration automatique des sessions (1 heure)
- Protection contre le rejeu de tokens (signature unique)

✅ **Protection contre les attaques**
- **Brute Force** : Verrouillage après 5 tentatives échouées pendant 15 minutes
- **SQL Injection** : Utilisation d'ORM Doctrine (requêtes préparées)
- **XSS (Cross-Site Scripting)** : Échappement automatique des sorties HTML
- **CSRF (Cross-Site Request Forgery)** : Tokens CSRF sur tous les formulaires

✅ **Connexions sécurisées**
- HTTPS/SSL en production (chiffrement TLS 1.3)
- Headers de sécurité (HSTS, CSP, X-Frame-Options)
- CORS configuré strictement (origines autorisées uniquement)

### 6.2 Mesures organisationnelles

🔒 **Accès restreint**
- Seuls les administrateurs autorisés peuvent accéder aux données
- Logs d'accès pour traçabilité
- Authentification forte pour l'administration

🔒 **Hébergement sécurisé**
- Serveurs locaux sécurisés (développement)
- Infrastructure Docker conteneurisée
- Sauvegardes régulières de la base de données

🔒 **Formation et sensibilisation**
- Respect des bonnes pratiques de développement sécurisé
- Veille sur les vulnérabilités (OWASP Top 10)
- Audits de sécurité périodiques

### 6.3 Notification de violation

En cas de violation de données personnelles (fuite, piratage), nous nous engageons à :
1. **Contenir la violation** dans les 24 heures
2. **Notifier la CNIL** dans les 72 heures si le risque est élevé
3. **Vous informer personnellement** par email si vos données sont concernées
4. **Proposer des mesures correctives** (changement de mot de passe, surveillance)

---

## 7. 🌍 Partage et transfert des données

### 7.1 Destinataires des données

Vos données personnelles **ne sont jamais vendues, louées ou échangées** à des tiers.

| Destinataire | Finalité | Base légale |
|--------------|----------|-------------|
| **Administrateurs CinéManga** | Gestion du service, support utilisateur | Intérêt légitime |
| **Hébergeur** | Stockage technique des données | Contrat |
| **Autorités compétentes** | Réquisition judiciaire uniquement | Obligation légale |

### 7.2 Transferts hors UE

**Aucun transfert de données hors de l'Union Européenne** n'est effectué dans le cadre de ce projet.

---

## 8. ✅ Vos droits RGPD

Conformément au RGPD, vous disposez des droits suivants :

### 8.1 Droit d'accès (Article 15)

**Vous pouvez consulter vos données personnelles à tout moment.**

📧 **Comment ?** 
- Consultez votre profil utilisateur dans l'application
- Contactez-nous par email pour un export complet

### 8.2 Droit de rectification (Article 16)

**Vous pouvez modifier vos informations personnelles si elles sont inexactes.**

✏️ **Comment ?**
- Modifiez directement vos informations dans votre profil
- Contactez-nous pour assistance

### 8.3 Droit à l'effacement / Droit à l'oubli (Article 17)

**Vous pouvez demander la suppression définitive de vos données.**

🗑️ **Comment ?**
- Utilisez la fonction "Supprimer mon compte" dans votre profil
- Contactez-nous par email : mounirou.cisse@ensitech.eu
- **Délai d'exécution** : 30 jours maximum

⚠️ **Limitations** :
- Conservation possible si obligation légale (ex: logs d'audit 12 mois)
- Anonymisation immédiate des données personnelles
- Conservation des statistiques anonymisées

### 8.4 Droit à la portabilité (Article 20)

**Vous pouvez récupérer vos données dans un format structuré.**

📦 **Comment ?**
- Demandez un export de vos données (format JSON ou CSV)
- Réception par email sous 30 jours maximum

**Données exportables** :
- Informations de profil
- Liste de favoris
- Historique de consultation
- Messages de contact

### 8.5 Droit d'opposition (Article 21)

**Vous pouvez vous opposer à certains traitements de données.**

🚫 **Comment ?**
- Désactivez les recommandations personnalisées
- Refusez les emails de notification (opt-out)
- Contactez-nous pour opposition spécifique

### 8.6 Droit à la limitation du traitement (Article 18)

**Vous pouvez demander de geler temporairement vos données.**

⏸️ **Comment ?**
- Contactez-nous par email avec votre demande motivée
- Délai de réponse : 15 jours maximum

### 8.7 Exercice de vos droits

📧 **Contact** : mounirou.cisse@ensitech.eu  
📝 **Objet du mail** : "Exercice de mes droits RGPD - CinéManga"  
🆔 **Informations à fournir** : 
- Nom, prénom
- Adresse email du compte
- Nature de la demande (accès, rectification, suppression, etc.)
- Justificatif d'identité (si demande de suppression)

**Délai de réponse** : 30 jours maximum (prorogeable de 2 mois si demande complexe)

### 8.8 Réclamation auprès de la CNIL

Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la **Commission Nationale de l'Informatique et des Libertés (CNIL)** :

📧 **Site web** : https://www.cnil.fr/fr/plaintes  
📞 **Téléphone** : 01 53 73 22 22  
📮 **Adresse** : 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07

---

## 9. 🍪 Cookies et technologies similaires

### 9.1 Cookies utilisés

| Cookie | Type | Finalité | Durée |
|--------|------|----------|-------|
| **JWT Token** | Authentification | Maintien de la session utilisateur | 1 heure |
| **Préférences UI** | Fonctionnel | Sauvegarde du thème, langue | 1 an |

### 9.2 Cookies tiers

**Aucun cookie tiers** (Google Analytics, publicité, réseaux sociaux) n'est utilisé sur CinéManga pour garantir votre confidentialité.

### 9.3 Gestion des cookies

🔧 **Vous pouvez** :
- Désactiver les cookies via votre navigateur
- Supprimer les cookies existants
- Paramétrer votre navigateur pour accepter/refuser au cas par cas

⚠️ **Attention** : La désactivation des cookies peut limiter l'accès à certaines fonctionnalités (authentification).

---

## 10. 👶 Protection des mineurs

CinéManga est accessible aux personnes de **13 ans et plus**.

🚸 **Pour les mineurs de moins de 16 ans** :
- Consentement parental requis pour l'inscription
- Les parents/tuteurs peuvent exercer les droits RGPD au nom du mineur
- Contenu adapté sans restriction d'âge excessive

📧 **Contact parental** : mounirou.cisse@ensitech.eu

---

## 11. 🔄 Modifications de la politique

Cette politique de confidentialité peut être mise à jour pour refléter :
- L'évolution de la réglementation (RGPD, lois nationales)
- L'ajout de nouvelles fonctionnalités
- L'amélioration de la sécurité

📅 **En cas de modification majeure** :
- Notification par email à tous les utilisateurs
- Affichage d'une bannière sur la plateforme
- Demande de nouveau consentement si nécessaire

**Dernière mise à jour** : 12 décembre 2025  
**Version** : 2.0 (Sécurité renforcée + RGPD)

---

## 12. 📞 Contact et délégué à la protection des données

### 12.1 Responsable du traitement

**Nom** : Mounirou CISSE  
**Qualité** : Développeur et responsable du projet CinéManga  
**Email** : mounirou.cisse@ensitech.eu  
**Établissement** : ENSITECH, France

### 12.2 Délégué à la Protection des Données (DPO)

Dans le cadre de ce projet académique, le responsable du traitement assume également les fonctions de DPO.

📧 **Contact DPO** : mounirou.cisse@ensitech.eu  
📝 **Objet** : "DPO CinéManga - Protection des données"

---

## 13. ✅ Consentement

**En créant un compte sur CinéManga, vous confirmez avoir :**

✅ Lu et compris cette politique de confidentialité  
✅ Accepté le traitement de vos données personnelles pour les finalités décrites  
✅ Pris connaissance de vos droits RGPD et des modalités d'exercice  
✅ Consenti librement et de manière éclairée au traitement de vos données

**Vous pouvez retirer votre consentement à tout moment** en supprimant votre compte ou en nous contactant.

---

## 14. 📚 Références légales

- **RGPD** : Règlement (UE) 2016/679 du Parlement européen
- **Loi Informatique et Libertés** : Loi n°78-17 du 6 janvier 1978 modifiée
- **Directive ePrivacy** : Directive 2002/58/CE
- **CNIL** : Commission Nationale de l'Informatique et des Libertés

---

## 15. 🌐 Liens externes

CinéManga peut contenir des liens vers des sites externes (ex: plateformes de streaming).

⚠️ **Attention** : 
- Ces sites ont leurs propres politiques de confidentialité
- Nous ne sommes pas responsables de leur traitement des données
- Nous vous recommandons de consulter leurs politiques avant utilisation

---

## 16. ✍️ Acceptation

**Date de première acceptation** : Date de création de votre compte  
**Date de dernière acceptation** : Affichée dans votre profil utilisateur

💚 **Merci de votre confiance !**

L'équipe CinéManga s'engage à protéger vos données personnelles et à respecter votre vie privée conformément aux standards les plus élevés de sécurité et de transparence.

---

**Document rédigé le 12 décembre 2025**  
**Projet CinéManga - Master 2 Développement Informatique**
