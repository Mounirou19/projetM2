# 📁 Index de la Documentation - CinéManga

## 📋 Vue d'ensemble

Ce dossier contient toute la documentation de conception du projet CinéManga, une plateforme de gestion de médias de type Allociné permettant aux utilisateurs de consulter des informations sur des films, séries et mangas, de gérer leurs favoris, et aux administrateurs de gérer le contenu.

### 🏗️ Architecture Technique
- **Backend** : Symfony 7.1 + PHP 8.2
- **Frontend** : React 18.3 + React Router  
- **Base de données** : MySQL 8.0
- **Authentification** : JWT (LexikJWTAuthenticationBundle)
- **Conteneurisation** : Docker + Docker Compose
- **Reverse Proxy** : Nginx

## 🎯 Diagrammes Créés - Synthèse Complète

Cette documentation contient **12 diagrammes de conception complets**, générés par rétro-ingénierie du code Symfony/React existant :

### ✅ Analyse Fonctionnelle
- **1 diagramme de cas d'utilisation** - 3 acteurs, 30+ fonctionnalités identifiées

### ✅ Architecture et Conception  
- **1 diagramme de classes** - Entités, contrôleurs, repositories, interfaces
- **1 diagramme d'architecture** - Infrastructure Docker, couches applicatives, sécurité JWT

### ✅ Comportements Dynamiques
- **6 diagrammes de séquence** - Couvrant tous les processus métier critiques
- **1 diagramme d'états** - Cycle de vie des utilisateurs et transitions

### ✅ Données et Interfaces
- **1 MCD + 1 MLD** - Modélisation complète base de données MySQL
- **1 diagramme de wireframes** - Interfaces utilisateur et admin

> **Total : 12 diagrammes de conception professionnels cohérents avec l'implémentation**

---

### 📚 Documentation Générale
- **README.md** (ce fichier) - Index complet de la documentation de conception
- Les diagrammes sont au format PlantUML (.puml) pour une maintenance facilitée
- Documentation générée par rétro-ingénierie du code existant pour assurer la cohérence

## �️ Détail des Diagrammes de Conception

#### 🎯 Analyse Fonctionnelle
- **usecase-diagram.puml** - Diagramme de cas d'utilisation
  - Acteurs : Visiteur, Utilisateur, Administrateur
  - Fonctionnalités principales identifiées
  - Relations d'inclusion et d'extension

#### 🏗️ Architecture Logicielle  
- **class-diagram.puml** - Diagramme de classes
  - Entités Doctrine (Users, Medias, Profils, Contacts)
  - Contrôleurs Symfony
  - Repositories et services
  - Relations et interfaces

- **architecture.puml** - Architecture système
  - Couches applicatives (Frontend, Backend, Database)
  - Services Docker et infrastructure
  - Flux de données et sécurité
  - Services externes et monitoring

#### 📈 Diagrammes de Séquence
- **sequence-login.puml** - Processus de connexion utilisateur avec JWT
- **sequence-register.puml** - Processus d'inscription avec validation sécurisée
- **sequence-favorites.puml** - Ajout/suppression favoris (relation many-to-many)
- **sequence-admin.puml** - Opérations d'administration avec double authentification
- **sequence-contact.puml** - Système de contact public sans authentification

#### 🔄 États et Cycles de Vie
- **state-user.puml** - États et transitions des comptes utilisateur
  - Cycle de vie des comptes (création, activation, suspension)
  - Transitions entre rôles (user, admin)
  - Gestion des états de compte

#### 💾 Modélisation des Données
- **mcd.puml** - Modèle Conceptuel de Données
  - Entités métier et attributs
  - Relations et cardinalités
  - Règles de gestion identifiées

- **mld.puml** - Modèle Logique de Données  
  - Tables et contraintes SQL
  - Index et optimisations
  - Scripts de création recommandés

#### 🖼️ Interface Utilisateur
- **wireframes.puml** - Maquettes fonctionnelles complètes
  - Page d'accueil avec catalogue de médias
  - Détail des médias et système de favoris
  - Interfaces d'authentification (connexion/inscription)
  - Profil utilisateur et gestion des favoris
  - Interface d'administration (CRUD médias/utilisateurs)
  - Version mobile responsive

## 🛠️ Outils Recommandés

### Visualisation des Diagrammes
Les diagrammes sont au format PlantUML (.puml). Pour les visualiser :

#### En ligne
- [PlantUML Online Server](http://www.plantuml.com/plantuml/)
- [PlantText](https://www.planttext.com/)

#### Éditeurs locaux
- **VSCode** : Extension "PlantUML"
- **IntelliJ/PHPStorm** : Plugin PlantUML
- **Atom** : Package plantuml-viewer

#### Export vers images
```bash
# Installation locale PlantUML
java -jar plantuml.jar docs/diagrams/*.puml

# Génération PNG/SVG
java -jar plantuml.jar -tpng docs/diagrams/
java -jar plantuml.jar -tsvg docs/diagrams/
```

## 📖 Guide de Lecture

### 🔰 Pour les Développeurs
1. **architecture.puml** - Compréhension globale du système Docker/Symfony/React
2. **class-diagram.puml** - Structure du code (entités, contrôleurs, repositories)
3. **sequence-*.puml** - Implémentation des processus métier avec JWT
4. **mld.puml** - Structure base de données MySQL optimisée

### 👨‍💼 Pour les Chefs de Projet  
1. **usecase-diagram.puml** - Fonctionnalités complètes (30+ cas d'usage identifiés)
2. **wireframes.puml** - Interfaces utilisateur et admin déjà implémentées
3. **sequence-*.puml** - Processus métier critiques (auth, favoris, admin, contact)
4. Ce **README.md** - Vue d'ensemble de la plateforme CinéManga

### 🏗️ Pour les Architectes
1. **architecture.puml** - Architecture Docker multi-container avec nginx
2. **mcd.puml** / **mld.puml** - Modélisation MySQL avec 4 entités principales  
3. **class-diagram.puml** - Patterns Symfony (Repository, Controller, Entity)
4. **state-user.puml** - Gestion des états utilisateur et rôles

### 🎨 Pour les Designers UX/UI
1. **wireframes.puml** - Maquettes complètes (accueil, détail, admin, mobile)
2. **usecase-diagram.puml** - Parcours utilisateur type Allociné
3. **sequence-*.puml** - Flux d'interaction détaillés (login, favoris, contact)

## 🔄 Processus de Mise à Jour

### Maintenance de la Documentation
- **Fréquence** : À chaque évolution majeure du code
- **Responsable** : Équipe de développement
- **Validation** : Chef de projet + Architecte

### Workflow de Modification
1. Modifier les fichiers .puml concernés
2. Valider la syntaxe PlantUML
3. Générer les images mises à jour
4. Mettre à jour TECHNICAL_DOCUMENTATION.md si nécessaire
5. Commit avec message explicite : "docs: update [diagram-name]"

### Convention de Nommage
```
docs/
├── diagrams/
│   ├── [type]-[name].puml
│   └── exports/
│       ├── [type]-[name].png
│       └── [type]-[name].svg
└── [TYPE]_DOCUMENTATION.md
```

**Types de diagrammes** :
- `usecase` - Cas d'utilisation
- `class` - Classes et objets
- `sequence` - Séquences d'interactions
- `architecture` - Architecture système
- `mcd` - Modèle conceptuel
- `mld` - Modèle logique
- `wireframes` - Maquettes interface

## 📚 Ressources Complémentaires

### Standards et Conventions
- **UML 2.5** - Notation des diagrammes
- **PlantUML Syntax** - Guide de syntaxe
- **Symfony Best Practices** - Architecture backend
- **React Patterns** - Patterns frontend

### Templates et Exemples
- **Thème PlantUML** : aws-orange (cohérence visuelle)
- **Couleurs** : Palette définie pour les différents types d'éléments
- **Légendes** : Standardisées selon le type de diagramme

### Formation PlantUML
- [Documentation officielle PlantUML](https://plantuml.com/)
- [Cheat Sheet PlantUML](https://ogres.gitlab.io/plantuml-cheatsheet/)
- [Exemples de diagrammes](https://real-world-plantuml.com/)

## 📝 Notes de Version

### Version 1.0 (Actuelle)
- ✅ Diagrammes de conception complets
- ✅ Documentation technique détaillée
- ✅ Wireframes des interfaces principales
- ✅ Modélisation des données

### Version 1.1 (Planifiée)
- 🔄 Diagrammes de déploiement
- 🔄 Documentation API OpenAPI/Swagger
- 🔄 Diagrammes de tests
- 🔄 Guide de contribution

## 🤝 Contribution

Pour contribuer à la documentation :

1. **Fork** du repository
2. **Création** d'une branche `docs/feature-name`
3. **Modification** des fichiers concernés
4. **Test** de la syntaxe PlantUML
5. **Pull Request** avec description détaillée

### Checklist Contribution
- [ ] Syntaxe PlantUML validée
- [ ] Images exportées si nécessaire
- [ ] Documentation technique mise à jour
- [ ] Index mis à jour si nouveaux fichiers
- [ ] Commit messages explicites

---

*Documentation de conception CinéManga - Générée par rétro-ingénierie du code Symfony/React*  
*12 diagrammes PlantUML complets et cohérents avec l'implémentation existante*  
*Dernière mise à jour : $(date '+%d %B %Y')*
