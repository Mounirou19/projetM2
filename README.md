# PROJET DE FIN D' ÉTUDES DE MASTER DI

## Installer les outils nécessaire (optionnel)

- Installer composer
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"
    sudo mv composer.phar /usr/local/bin/composer

- Installer npm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.bashrc     # ou ~/.zshrc selon ton shell
    nvm install --lts     # installe la dernière version stable de Node.js
    nvm use --lts

## Installer le projet

### Copier le projet depuis github
    git clone https://github.com/Mounirou19/projetM2.git
    cd projetM2/

### Installer les dépendances

**Être à la racine du projet**

1. **Symfony**
    - composer install
2. **React**
    - cd view
    - npm install

## Démarrage du projet

### Lancement du projet
    Le projet est dockerisé et le fichier compose.yaml est déjà fourni. Il ne vous reste plus qu'à être à la racine du projet depuis votre terminal et à lancer la commande : 

    docker-compose up --build

    Si vous vous y connaissait en docker je vous laisse le soin de changer les différents mot de passes mis dans le compose.yaml pour la base de données sinon laisser comme tel vous n'aurez pas besoin de vous connectez pour accéder à phpmyadmin 

### Lien du projet
    D'abord on va modifier le fichier /etc/hosts sur mac en ajoutant cette ligne:
    127.0.0.1 film-serie-manga.fr.local
    sinon aller directement sur le lien : http://localhost:3000/

    Lorsque la ligne sera ajoutée sur le fichier /etc/hosts vous pourrez accéder au site web en tapant ce lien sur la barre de recherche : http://film-serie-manga.fr.local:3000/

