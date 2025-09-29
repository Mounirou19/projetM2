<?php

namespace App\Entity;

use App\Repository\ContactsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Entité Contacts - Gestion des messages de contact
 * 
 * Cette entité stocke tous les messages envoyés via le formulaire de contact.
 * Elle permet de gérer les demandes des utilisateurs de manière centralisée
 * et indépendante du système d'authentification.
 * 
 * @author Mounirou
 * @version 1.0
 */
#[ORM\Entity(repositoryClass: ContactsRepository::class)]
class Contacts
{
    /**
     * Identifiant unique du message
     * Clé primaire auto-incrémentée
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Nom de la personne qui contacte
     * Peut être un utilisateur enregistré ou anonyme
     */
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * Adresse email de contact
     * Utilisée pour la réponse
     */
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    /**
     * Sujet du message
     * Résumé bref de la demande
     */
    #[ORM\Column(length: 255)]
    private ?string $subject = null;

    /**
     * Contenu du message
     * Texte libre détaillant la demande
     */
    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    /**
     * Date de création du message
     * Timestamp immutable de réception
     */
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * Statut du message
     * true = actif/non traité, false = traité/archivé
     */
    #[ORM\Column]
    private ?bool $status = null;

    /**
     * Obtenir l'identifiant du message
     * 
     * @return int|null L'ID du message ou null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Obtenir le nom de la personne
     * 
     * @return string|null Le nom ou null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * Définir le nom de la personne
     * 
     * @param string $name Le nom de la personne
     * @return static L'instance courante pour le chaînage
     */
    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Obtenir l'adresse email
     * 
     * @return string|null L'email ou null
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * Définir l'adresse email
     * 
     * @param string $email L'adresse email
     * @return static L'instance courante pour le chaînage
     */
    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Obtenir le sujet du message
     * 
     * @return string|null Le sujet ou null
     */
    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): static
    {
        $this->subject = $subject;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

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
}
