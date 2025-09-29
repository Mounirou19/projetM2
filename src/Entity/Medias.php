<?php

namespace App\Entity;

use App\Repository\MediasRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Entité Medias - Gestion des contenus multimédias de la plateforme
 * 
 * Cette entité représente tous les types de médias disponibles sur la plateforme :
 * films, séries, mangas. Elle stocke les métadonnées essentielles pour
 * l'affichage et la gestion du contenu.
 * 
 * @author Mounirou
 * @version 1.0
 */
#[ORM\Entity(repositoryClass: MediasRepository::class)]
class Medias
{
    /**
     * Identifiant unique du média
     * Clé primaire auto-incrémentée
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Titre du média
     * Nom principal affiché aux utilisateurs
     */
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    /**
     * Type de média
     * Valeurs possibles: "film", "serie", "manga"
     * Permet de catégoriser le contenu
     */
    #[ORM\Column(length: 255)]
    private ?string $type = null;

    /**
     * URL de l'image/affiche du média
     * Optionnel - peut pointer vers un CDN ou stockage local
     */
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imageUrl = null;

    /**
     * Description détaillée du média
     * Synopsis, résumé ou présentation du contenu
     * Stocké en TEXT pour permettre de longs textes
     */
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    /**
     * Statut de publication du média
     * true = publié et visible, false = en attente/masqué
     */
    #[ORM\Column]
    private ?bool $status = null;

    /**
     * Score/Note du média
     * Note sur 10 ou système de points
     * Utilisé pour les recommandations et classements
     */
    #[ORM\Column]
    private ?int $score = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(string $imageUrl): static
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(?int $score): static
    {
        $this->score = $score;

        return $this;
    }
}
