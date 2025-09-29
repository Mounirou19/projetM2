# 🎬 CinéManga - Plateforme de Gestion de Médias

## 📖 Description du Projet

**CinéManga** est une plateforme web moderne de type Allociné permettant aux utilisateurs de découvrir, noter et gérer leurs films, séries et mangas favoris. Le projet est développé dans le cadre d'un Master en Développement Informatique.

### 🎯 Objectifs
- Fournir une interface intuitive pour parcourir les médias
- Permettre aux utilisateurs de créer des listes personnalisées (favoris/watchlist)
- Offrir un système de notation et de recommandations
- Proposer une interface d'administration complète
- Préparer l'intégration future du streaming vidéo

## 🏗️ Architecture Technique

### Stack Technologique
- **Backend** : Symfony 7.1 (PHP 8.2+)
- **Frontend** : React 18.3 avec React Router
- **Base de données** : MySQL 8.0
- **Authentification** : JWT (LexikJWTAuthenticationBundle)
- **API** : REST avec CORS
- **Conteneurisation** : Docker & Docker Compose
- **Reverse Proxy** : Nginx

### Structure du Projet
```
projetM2/
├── src/                    # Backend Symfony
│   ├── Controller/         # Contrôleurs API
│   ├── Entity/            # Entités Doctrine
│   ├── Repository/        # Repositories Doctrine
│   └── Command/           # Commandes console
├── view/                  # Frontend React
│   ├── src/components/    # Composants React
│   ├── public/           # Assets statiques
│   └── package.json      # Dependencies npm
├── config/               # Configuration Symfony
├── migrations/           # Migrations base de données
├── docker/              # Configuration Docker
└── compose.yaml         # Docker Compose
```

## 🚀 Fonctionnalités

### 👤 Gestion des Utilisateurs
- **Inscription/Connexion** : Système complet avec validation
- **Authentification JWT** : Sécurisation des API
- **Profils utilisateurs** : Gestion des informations personnelles
- **Système de rôles** : Utilisateur standard et Administrateur

### 🎭 Gestion des Médias
- **CRUD complet** : Création, lecture, modification, suppression
- **Types supportés** : Films, Séries, Mangas
- **Métadonnées** : Titre, description, image, score, statut
- **Système de notation** : Score sur 10

### ⭐ Fonctionnalités Utilisateur
- **Listes personnalisées** : Favoris et watchlist
- **Recherche et filtres** : Par type, titre, score
- **Interface responsive** : Adaptation mobile/desktop
- **Recommandations** : Basées sur les préférences

### 🛠️ Administration
- **Tableau de bord** : Statistiques complètes
- **Gestion utilisateurs** : CRUD, activation/désactivation
- **Gestion médias** : Modération du contenu
- **Système de contact** : Gestion des messages utilisateurs

## 📦 Installation et Déploiement

### Prérequis
- Docker et Docker Compose
- Git
- (Optionnel) PHP 8.2+, Composer, Node.js 18+

### Installation Rapide avec Docker

1. **Cloner le projet**
```bash
git clone https://github.com/Mounirou19/projetM2.git
cd projetM2/
```

2. **Configurer l'environnement**
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Modifier les variables si nécessaire
nano .env
```

3. **Lancer l'application**
```bash
docker-compose up --build
```

4. **Configuration des hôtes (optionnel)**
```bash
# Ajouter dans /etc/hosts (macOS/Linux) ou C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 film-serie-manga.fr.local
```

### Installation Manuelle (Développement)

1. **Backend Symfony**
```bash
# Installer les dépendances
composer install

# Configurer la base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# Créer un admin (optionnel)
php bin/console app:create-admin
```

2. **Frontend React**
```bash
cd view/
npm install
npm start
```

## 🌐 Accès à l'Application

### URLs Principales
- **Application React** : http://localhost:3000 ou http://film-serie-manga.fr.local:3000
- **API Symfony** : http://localhost:8083
- **phpMyAdmin** : http://localhost:8081

### Comptes de Test
- **Administrateur** : admin@cinemanga.fr / admin123
- **Utilisateur** : user@cinemanga.fr / user123

## 🔧 Configuration Docker

### Services Disponibles
- **web** : Container PHP-FPM (Symfony)
- **react** : Container Node.js (React)
- **nginx** : Serveur web reverse proxy
- **database** : MySQL 8.0
- **phpmyadmin** : Interface d'administration BDD

### Variables d'Environnement
```yaml
# React
REACT_APP_API_URL=http://localhost:8083
REACT_APP_TOKEN=d@t@ventureprojetM2123$

# MySQL
MYSQL_DATABASE=projetM2
MYSQL_USER=mounir
MYSQL_PASSWORD=moumou
```

## 🔒 Sécurité

### Authentification
- **JWT Tokens** : Expiration configurable
- **Hachage des mots de passe** : bcrypt
- **Protection CORS** : Configuration stricte
- **Validation des entrées** : Contraintes Symfony

### Permissions
- **Routes protégées** : Middleware d'authentification
- **Contrôle d'accès** : Basé sur les rôles
- **Tokens d'administration** : Sécurisation des actions sensibles

## 📊 Base de Données

### Entités Principales
- **Users** : Gestion des utilisateurs
- **Medias** : Stockage des films/séries/mangas
- **Profils** : Relations utilisateur-média (favoris)
- **Contacts** : Messages de contact

### Migrations
```bash
# Créer une nouvelle migration
php bin/console make:migration

# Appliquer les migrations
php bin/console doctrine:migrations:migrate
```

## 🧪 Tests et Développement

### Commandes Utiles
```bash
# Symfony
php bin/console cache:clear
php bin/console debug:router
php bin/console doctrine:schema:validate

# React
npm test
npm run build
npm run lint
```

### Logs et Debugging
- **Logs Symfony** : var/log/
- **Logs Docker** : docker-compose logs [service]
- **Notifications** : notifications.log

## 🤝 Contribution

### Workflow de Développement
1. Fork du projet
2. Création d'une branche feature
3. Développement et tests
4. Pull Request avec description

### Standards de Code
- **PSR-12** pour PHP
- **ESLint** pour JavaScript
- **Documentation** des nouvelles fonctionnalités

## 📚 Documentation Technique

### API Endpoints
- `POST /register` - Inscription utilisateur
- `POST /login` - Connexion
- `GET /media` - Liste des médias
- `GET /media/{id}` - Détail d'un média
- `GET /admin/board` - Tableau de bord admin

### Structure des Données
Voir les diagrammes de conception dans `/docs/diagrams/`

## 🛣️ Roadmap

### Version 1.0 (Actuelle)
- ✅ Authentification et gestion utilisateurs
- ✅ CRUD médias complet
- ✅ Interface d'administration
- ✅ Système de favoris

### Version 2.0 (Planifiée)
- 🔄 Streaming vidéo intégré
- 🔄 Système de commentaires
- 🔄 Recommandations IA
- 🔄 API mobile native

## 📞 Support

### Problèmes Connus
- Performance sur de gros volumes de données
- Optimisation mobile à améliorer

### Contact
- **Développeur** : Mounirou
- **Email** : contact@cinemanga.fr
- **GitHub** : https://github.com/Mounirou19/projetM2

---
*Développé avec ❤️ dans le cadre du Master DI*

