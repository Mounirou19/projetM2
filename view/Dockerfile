# Utilise une image Node plus récente
FROM node:16-alpine

# Crée le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json (si présent) et installe les dépendances
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copie le reste des fichiers du projet
COPY . .

# Expose le port sur lequel l'application React fonctionne
EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]