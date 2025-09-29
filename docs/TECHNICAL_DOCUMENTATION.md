# 📚 Documentation Technique - CinéManga

## 🎯 Vue d'ensemble du projet

**CinéManga** est une plateforme web moderne de gestion et découverte de médias (films, séries, mangas) développée avec une architecture découplée utilisant Symfony pour l'API backend et React pour l'interface utilisateur.

## 📋 Spécifications Techniques

### Technologies Utilisées

#### Backend
- **Framework**: Symfony 7.1
- **Langage**: PHP 8.2+
- **ORM**: Doctrine
- **Authentification**: JWT (LexikJWTAuthenticationBundle)
- **Validation**: Symfony Validator
- **API**: REST avec support CORS

#### Frontend
- **Framework**: React 18.3
- **Routing**: React Router DOM 6.27
- **HTTP Client**: Axios
- **UI Components**: Custom components
- **Charts**: Chart.js + React-ChartJS-2
- **Carousel**: React Slick

#### Base de Données
- **SGBD**: MySQL 8.0
- **Driver**: PDO MySQL
- **Migrations**: Doctrine Migrations

#### Infrastructure
- **Containerisation**: Docker + Docker Compose
- **Serveur Web**: Nginx (reverse proxy)
- **PHP Runtime**: PHP-FPM 8.2
- **Administration BD**: phpMyAdmin

### Architecture du Système

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Symfony)     │◄──►│   (MySQL)       │
│   Port 3000     │    │   Port 8083     │    │   Port 3306     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                       │
│         nginx (reverse proxy) + phpMyAdmin (8081)              │
└─────────────────────────────────────────────────────────────────┘
```

## 🗂️ Structure du Projet

### Backend (Symfony)
```
src/
├── Controller/          # Contrôleurs API REST
│   ├── AuthController.php
│   ├── MediaController.php
│   ├── AdminController.php
│   ├── ProfilController.php
│   └── ContactController.php
├── Entity/              # Entités Doctrine
│   ├── Users.php
│   ├── Medias.php
│   ├── Profils.php
│   └── Contacts.php
├── Repository/          # Repositories Doctrine
│   ├── UsersRepository.php
│   ├── MediasRepository.php
│   ├── ProfilsRepository.php
│   └── ContactsRepository.php
└── Command/             # Commandes CLI
    └── CreateAdminCommand.php
```

### Frontend (React)
```
src/
├── components/          # Composants React
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── media/
│   │   ├── MediaPage.js
│   │   └── OneMediaPage.js
│   ├── admin/
│   │   ├── AdminPage.js
│   │   ├── StatsPage.js
│   │   └── CreateUser.js
│   └── profil/
│       ├── ProfilPage.js
│       └── EditProfilPage.js
├── css/                 # Styles CSS
├── ProtectedRoute*.js   # Guards de routes
└── App.js              # Composant principal
```

## 🔗 API Endpoints

### Authentification
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/register` | Inscription utilisateur | ❌ |
| POST | `/login` | Connexion + JWT | ❌ |
| GET | `/protected` | Test route protégée | ✅ |

### Médias Publics
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/media` | Liste tous les médias | ❌ |
| GET | `/media/{id}` | Détail d'un média | ❌ |

### Gestion Profils
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/profil/get/{userId}/{mediaId}` | Vérifier favori | 👤 |
| GET | `/profil/create/{userId}/{mediaId}` | Ajouter aux favoris | 👤 |
| GET | `/profil/user/{userId}` | Favoris utilisateur | 👤 |
| DELETE | `/profil/delete/{id}` | Retirer des favoris | 👤 |
| GET | `/user/profil/{id}` | Info utilisateur | 👤 |
| PUT | `/delete/profil/{id}` | Désactiver profil | 👤 |

### Administration
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/admin/board` | Dashboard admin | 🔐 |
| GET | `/admin/medias` | Liste médias admin | 🔐 |
| POST | `/admin/user/create` | Créer utilisateur | 🔐 |
| POST | `/admin/media/create` | Créer média | 🔐 |
| GET | `/admin/user/{id}` | Détail utilisateur | 🔐 |
| GET | `/admin/media/{id}` | Détail média | 🔐 |
| PUT | `/admin/user/delete/{id}` | Désactiver utilisateur | 🔐 |
| DELETE | `/admin/user/deletever/{id}` | Supprimer définitivement | 🔐 |
| PUT | `/admin/user/reactivate/{id}` | Réactiver utilisateur | 🔐 |
| PUT | `/admin/media/delete/{id}` | Désactiver média | 🔐 |
| PUT | `/admin/media/reactivate/{id}` | Réactiver média | 🔐 |
| PUT | `/admin/user/update/{id}` | Modifier utilisateur | 🔐 |
| PUT | `/admin/media/update/{id}` | Modifier média | 🔐 |
| GET | `/admin/contact/{id}` | Détail contact | 🔐 |
| PUT | `/admin/contact/lu/{id}` | Marquer lu | 🔐 |
| DELETE | `/admin/contact/delete/{id}` | Supprimer contact | 🔐 |

### Contact
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/contact/create` | Envoyer message | ❌ |

**Légende**: ❌ Aucune | 👤 Utilisateur | 🔐 Administrateur

## 🔐 Système d'Authentification

### JWT (JSON Web Tokens)
- **Algorithme**: RS256 (clés publique/privée)
- **Durée de vie**: Configurable (1h par défaut)
- **Stockage côté client**: localStorage
- **Refresh**: Manuel (re-login requis)

### Autorisation Administrative
Le système utilise un triple contrôle pour les opérations d'administration :

1. **Header HTTP**: `X-ADMIN-TOKEN`
2. **Query Parameter**: `infos` contenant `ROLE_ADMIN,{admin_token}`
3. **Token spécial**: `d@t@ventureprojetM2123$`

```php
private function isAuthorized(Request $request): bool
{
    $token = $request->headers->get('X-ADMIN-TOKEN');
    return $token === $_ENV['ADMIN_ACCESS_TOKEN'];
}
```

### Rôles Utilisateur
- **ROLE_USER**: Accès aux fonctionnalités utilisateur
- **ROLE_ADMIN**: Accès complet + interface d'administration

## 💾 Modèle de Données

### Entités Principales

#### Users
```php
- id: int (PK, auto-increment)
- lastname: string(255) NOT NULL
- firstname: string(255) NOT NULL  
- email: string(255) UNIQUE NOT NULL
- password: string(255) NOT NULL (bcrypt)
- role: string(255) NOT NULL DEFAULT 'ROLE_USER'
- status: boolean NOT NULL DEFAULT true
```

#### Medias
```php
- id: int (PK, auto-increment)
- title: string(255) NOT NULL
- type: string(255) NOT NULL ('film'|'serie'|'manga')
- imageUrl: string(255) NULLABLE
- description: text NULLABLE
- status: boolean NOT NULL DEFAULT true
- score: int NOT NULL DEFAULT 0
```

#### Profils (Table de liaison)
```php
- id: int (PK, auto-increment)
- id_user: int NOT NULL (FK users.id)
- id_media: int NOT NULL (FK medias.id)
- UNIQUE(id_user, id_media)
```

#### Contacts
```php
- id: int (PK, auto-increment)
- name: string(255) NOT NULL
- email: string(255) NOT NULL
- subject: string(255) NOT NULL
- message: text NOT NULL
- createdAt: datetime NOT NULL
- status: boolean NOT NULL DEFAULT true
```

### Relations
- **Users** 1:N **Profils** (Un utilisateur peut avoir plusieurs favoris)
- **Medias** 1:N **Profils** (Un média peut être favori de plusieurs utilisateurs)
- **Contacts** indépendant (pas de relation FK)

## 🚀 Déploiement

### Avec Docker Compose (Recommandé)

1. **Cloner le projet**
```bash
git clone https://github.com/Mounirou19/projetM2.git
cd projetM2/
```

2. **Lancer les services**
```bash
docker-compose up --build
```

3. **Accès aux services**
- Application: http://localhost:3000
- API: http://localhost:8083
- phpMyAdmin: http://localhost:8081

### Déploiement Manuel

#### Backend
```bash
# Dépendances
composer install

# Configuration base de données
cp .env.example .env
# Éditer DATABASE_URL dans .env

# Base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# Créer un admin
php bin/console app:create-admin

# Démarrer serveur dev
symfony server:start
```

#### Frontend
```bash
cd view/
npm install
npm start
```

## ⚙️ Configuration

### Variables d'Environnement

#### Backend (.env)
```env
DATABASE_URL="mysql://user:password@127.0.0.1:3306/cinemanga"
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
ADMIN_ACCESS_TOKEN=35!3J*V5p$5Qf3y6EjzbUG&
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8083
REACT_APP_TOKEN=d@t@ventureprojetM2123$
REACT_APP_ROLE_USER=ROLE_USER
REACT_APP_ROLE_ADMIN=ROLE_ADMIN
REACT_APP_ADMIN_ACCESS_TOKEN=35!3J*V5p$5Qf3y6EjzbUG&
```

### Configuration Nginx
```nginx
server {
    listen 80;
    root /var/www/html/public;
    
    location / {
        try_files $uri /index.php$is_args$args;
    }
    
    location ~ ^/index\.php(/|$) {
        fastcgi_pass web:9000;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }
}
```

## 🐛 Debug et Logs

### Logs Backend
- **Application**: `var/log/dev.log`
- **Doctrine**: Requêtes SQL dans le profiler Symfony
- **Erreurs**: `var/log/error.log`

### Logs Frontend
- **Console**: Erreurs JavaScript dans DevTools
- **Network**: Requêtes API dans l'onglet Réseau
- **State**: React DevTools pour l'état des composants

### Logs Docker
```bash
# Logs de tous les services
docker-compose logs

# Logs d'un service spécifique
docker-compose logs web
docker-compose logs react
docker-compose logs database
```

## 📈 Performance et Optimisation

### Backend
- **Cache**: Doctrine Query Cache activé en production
- **OpCache**: PHP OpCache pour la compilation
- **Database**: Index sur les champs fréquemment utilisés

### Frontend
- **Bundle Splitting**: Code splitting par route
- **Lazy Loading**: Images chargées à la demande
- **Memoization**: React.memo pour les composants coûteux

### Base de Données
```sql
-- Index de performance recommandés
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_medias_type_status ON medias(type, status);
CREATE INDEX idx_medias_score ON medias(score DESC);
CREATE INDEX idx_profils_user_media ON profils(id_user, id_media);
```

## 🧪 Tests

### Tests Backend
```bash
# Tests unitaires
php bin/phpunit

# Tests d'intégration API
php bin/phpunit tests/Controller/
```

### Tests Frontend
```bash
cd view/
npm test
npm run test:coverage
```

## 🔄 Évolutions Futures

### Version 2.0 Planifiée
1. **Streaming vidéo**: Intégration lecteur vidéo
2. **Système de notation**: Remplacement du score simple
3. **Commentaires**: Système de reviews utilisateurs
4. **Recherche avancée**: Elasticsearch
5. **Notifications**: WebSockets pour temps réel
6. **Mobile**: Application React Native
7. **Genres/Catégories**: Système de taxonomie avancé
8. **Recommandations**: Algorithme ML

### Améliorations Techniques
1. **Cache Redis**: Cache applicatif
2. **CDN**: Stockage des images
3. **API GraphQL**: Alternative à REST
4. **Tests E2E**: Cypress/Playwright
5. **CI/CD**: GitHub Actions
6. **Monitoring**: Prometheus + Grafana

## 📚 Ressources

### Documentation Officielle
- [Symfony Documentation](https://symfony.com/doc/)
- [React Documentation](https://react.dev/)
- [Doctrine ORM](https://www.doctrine-project.org/)
- [Docker Compose](https://docs.docker.com/compose/)

### Outils de Développement
- **IDE**: PHPStorm, VSCode
- **API Testing**: Postman, Insomnia
- **Database**: MySQL Workbench, phpMyAdmin
- **Version Control**: Git, GitHub

---
*Documentation mise à jour le 29 septembre 2025*
