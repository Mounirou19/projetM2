# 📁 Index de la Documentation - CinéManga

## 📋 Vue d'ensemble

Ce dossier contient toute la documentation technique et de conception du projet CinéManga, une plateforme de gestion de médias développée dans le cadre d'un Master en Développement Informatique.

## 🗂️ Structure de la Documentation

### 📚 Documentation Générale
- **README.md** (racine) - Guide d'installation et présentation du projet
- **TECHNICAL_DOCUMENTATION.md** - Documentation technique complète

### 📊 Diagrammes de Conception

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
- **sequence-login.puml** - Processus de connexion utilisateur
- **sequence-register.puml** - Processus d'inscription
- **sequence-favorites.puml** - Ajout aux favoris
- **sequence-admin.puml** - Opérations d'administration
- **sequence-contact.puml** - Système de contact

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
- **wireframes.puml** - Maquettes fonctionnelles
  - Page d'accueil et navigation
  - Interfaces utilisateur et admin
  - Formulaires et interactions

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
1. **README.md** - Installation et démarrage rapide
2. **architecture.puml** - Compréhension globale du système
3. **class-diagram.puml** - Structure du code
4. **TECHNICAL_DOCUMENTATION.md** - Référence complète

### 👨‍💼 Pour les Chefs de Projet
1. **usecase-diagram.puml** - Fonctionnalités et acteurs
2. **wireframes.puml** - Interface utilisateur
3. **sequence-*.puml** - Processus métier
4. **README.md** - Vue d'ensemble du projet

### 🏗️ Pour les Architectes
1. **architecture.puml** - Architecture technique
2. **mcd.puml** / **mld.puml** - Modélisation des données
3. **class-diagram.puml** - Design patterns utilisés
4. **TECHNICAL_DOCUMENTATION.md** - Choix techniques

### 🎨 Pour les Designers UX/UI
1. **wireframes.puml** - Maquettes fonctionnelles
2. **usecase-diagram.puml** - Parcours utilisateur
3. **sequence-*.puml** - Interactions et flux

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

*Index maintenu par l'équipe de développement CinéManga*  
*Dernière mise à jour : 29 septembre 2025*
