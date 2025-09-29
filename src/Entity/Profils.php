<?php

namespace App\Entity;

use App\Repository\ProfilsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * Entité Profils - Table de liaison pour les favoris utilisateur
 * 
 * Cette entité représente la relation many-to-many entre les utilisateurs
 * et leurs médias favoris. Elle permet de gérer les listes de favoris
 * de chaque utilisateur de manière optimisée.
 * 
 * Structure : Un profil = Un utilisateur + Un média favori
 * 
 * @author Mounirou
 * @version 1.0
 */
#[ORM\Entity(repositoryClass: ProfilsRepository::class)]
class Profils
{
    /**
     * Identifiant unique du profil
     * Clé primaire auto-incrémentée
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Référence vers l'utilisateur
     * Clé étrangère vers la table users
     */
    #[ORM\Column]
    private ?int $id_user = null;

    /**
     * Référence vers le média favori
     * Clé étrangère vers la table medias
     */
    #[ORM\Column]
    private ?int $id_media = null;

    /**
     * Obtenir l'identifiant du profil
     * 
     * @return int|null L'ID du profil ou null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Obtenir l'ID de l'utilisateur
     * 
     * @return int|null L'ID de l'utilisateur ou null
     */
    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    /**
     * Définir l'ID de l'utilisateur
     * 
     * @param int $id_user L'ID de l'utilisateur
     * @return static L'instance courante pour le chaînage
     */
    public function setIdUser(int $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    /**
     * Obtenir l'ID du média
     * 
     * @return int|null L'ID du média ou null
     */
    public function getIdMedia(): ?int
    {
        return $this->id_media;
    }

    /**
     * Définir l'ID du média
     * 
     * @param int $id_media L'ID du média
     * @return static L'instance courante pour le chaînage
     */
    public function setIdMedia(int $id_media): static
    {
        $this->id_media = $id_media;

        return $this;
    }
}
