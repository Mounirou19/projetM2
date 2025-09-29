# 🎨 Guide de Visualisation des Diagrammes

## 📁 Images Générées

Tous vos diagrammes PlantUML ont été convertis en images dans le dossier `exports/` :

### 🖼️ Formats Disponibles
- **PNG** : Pour l'affichage web et documents
- **SVG** : Format vectoriel pour impression et zoom

### 📊 Diagrammes Disponibles

1. **Architecture Système - CinéManga.png** 
   - Vue d'ensemble de l'infrastructure Docker
   - Flux de données entre les services

2. **Diagramme de Cas d'Utilisation - CinéManga.png**
   - Fonctionnalités par acteur
   - Relations entre les cas d'usage

3. **Diagramme de Classes - CinéManga.png**
   - Structure du code backend
   - Relations entre entités et contrôleurs

4. **MCD - CinéManga.png** (Modèle Conceptuel)
   - Modélisation métier des données
   - Règles de gestion

5. **MLD - CinéManga.png** (Modèle Logique)
   - Structure SQL de la base de données
   - Index et optimisations

6. **Séquence Administration - CinéManga.png**
   - Processus de gestion admin

7. **Séquence Connexion - CinéManga.png**
   - Authentification JWT

8. **Séquence Contact - CinéManga.png**
   - Système de messagerie

9. **Séquence Favoris - CinéManga.png**
   - Gestion des préférences utilisateur

10. **Séquence Inscription - CinéManga.png**
    - Création de compte utilisateur

11. **Wireframes - CinéManga.png**
    - Maquettes des interfaces

## 🔧 Comment Visualiser

### Option 1: Images Générées (Plus Simple)
```bash
# Ouvrir le dossier avec les images
open docs/diagrams/exports/
```

### Option 2: VSCode avec Extension PlantUML
1. Installer l'extension "PlantUML" dans VSCode
2. Ouvrir un fichier .puml
3. `Cmd+Shift+P` → "PlantUML: Preview Current Diagram"
4. Ou utiliser `Alt+D`

### Option 3: En Ligne
1. Copier le contenu d'un fichier .puml
2. Aller sur http://www.plantuml.com/plantuml/uml/
3. Coller et cliquer "Submit"

### Option 4: Ligne de Commande
```bash
# Générer un diagramme spécifique en PNG
plantuml -tpng docs/diagrams/class-diagram.puml

# Générer tous en SVG
plantuml -tsvg docs/diagrams/*.puml -o docs/diagrams/exports/
```

## 📋 Utilisation par Profil

### 👨‍💻 Développeurs
Commencez par :
1. **class-diagram.png** - Structure du code
2. **architecture.png** - Infrastructure technique

### 👨‍💼 Chefs de Projet  
Consultez :
1. **usecase-diagram.png** - Fonctionnalités
2. **wireframes.png** - Interfaces utilisateur

### 🏗️ Architectes
Analysez :
1. **mcd.png** / **mld.png** - Modélisation données
2. **architecture.png** - Design technique

### 🎨 Designers UX/UI
Focalisez sur :
1. **wireframes.png** - Maquettes
2. **sequence-*.png** - Parcours utilisateur

## 🔄 Mise à Jour des Diagrammes

Si vous modifiez les fichiers .puml, régénérez les images :

```bash
# Se placer dans le dossier diagrams
cd docs/diagrams/

# Générer toutes les images
plantuml -tpng *.puml -o exports/
plantuml -tsvg *.puml -o exports/
```

## 📱 Intégration dans la Documentation

Les images peuvent être utilisées dans :
- **Présentations** PowerPoint/Keynote
- **Documents** Word/Google Docs  
- **Wiki** GitHub/GitLab
- **Sites web** avec balises `<img>`

### Exemple d'intégration Markdown :
```markdown
![Diagramme de Classes](docs/diagrams/exports/Diagramme%20de%20Classes%20-%20CinéManga.png)
```

---
*Guide créé automatiquement - Dernière mise à jour : 29 septembre 2025*
