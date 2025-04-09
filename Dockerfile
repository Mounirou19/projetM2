# Dockerfile.symfony
FROM php:8.2-fpm

# Installation des extensions requises
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

RUN apt-get update && apt-get install -y default-mysql-client

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installation des dépendances de l'application
WORKDIR /var/www/html

COPY . .
# RUN composer install