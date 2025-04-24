REQUETE SQL pour la maj auto des scores des medias lors de l ajout ou la suppression d un profil

DELIMITER //

CREATE TRIGGER `after_insert_on_profils`
AFTER INSERT ON `profils`
FOR EACH ROW
BEGIN
    UPDATE `medias`
    SET `score` = (
        SELECT COUNT(*)
        FROM `profils`
        WHERE `id_media` = NEW.`id_media`
    )
    WHERE `id` = NEW.`id_media`;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER `after_delete_on_profils`
AFTER DELETE ON `profils`
FOR EACH ROW
BEGIN
    UPDATE `medias`
    SET `score` = (
        SELECT COUNT(*)
        FROM `profils`
        WHERE `id_media` = OLD.`id_media`
    )
    WHERE `id` = OLD.`id_media`;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER prevent_createdAt_update
BEFORE UPDATE ON `contacts`
FOR EACH ROW
BEGIN
    SET NEW.`createdAt` = OLD.`createdAt`;
END; //

DELIMITER ;



# Installation des différents outils nécessaires

## Symfony

## ReactJS


# Projet

## Lancement du projet

Le projet est dockerisé et le fichier compose.yaml est déjà fourni. Il ne vous reste plus qu'à être à la racine du projet depuis votre terminal et à lancer la commande : 

docker-compose up --build

Si vous vous y connaissait en docker je vous laisse le soin de changer les différents mot de passes mis dans le compose.yaml pour la base de données sinon laisser comme tel vous n'aurez pas besoin de vous connectez pour accéder à phpmyadmin 

## Lien du projet

d'abord on va modifier le fichier /etc/hosts sur mac en ajoutant cette ligne:
127.0.0.1 film-serie-manga.fr.local
sinon aller directement sur le lien : http://localhost:3000/

Ensuite lorsque le projet est dockerisé et la ligne ajoutée sur le fichier /etc/hosts vous pourrez accéder au site web en tapant ce lien sur la barre de recherche : http://film-serie-manga.fr.local:3000/

