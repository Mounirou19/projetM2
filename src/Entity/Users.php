<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

/**
 * Entité Users - Gestion des utilisateurs de la plateforme CinéManga
 * 
 * Cette entité représente un utilisateur du système avec ses informations
 * personnelles et ses droits d'accès. Elle implémente les interfaces
 * de sécurité Symfony pour l'authentification.
 * 
 * @author Mounirou
 * @version 1.0
 */
#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * Identifiant unique de l'utilisateur
     * Clé primaire auto-incrémentée
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Nom de famille de l'utilisateur
     * Requis pour l'inscription
     */
    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    /**
     * Prénom de l'utilisateur
     * Requis pour l'inscription
     */
    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    /**
     * Adresse email de l'utilisateur
     * Unique dans le système, utilisée comme identifiant de connexion
     */
    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    /**
     * Mot de passe haché de l'utilisateur
     * Utilise bcrypt pour le hachage sécurisé
     */
    #[ORM\Column(length: 255)]
    private ?string $password = null;

    /**
     * Rôle de l'utilisateur dans le système
     * Valeurs possibles: ROLE_USER, ROLE_ADMIN
     */
    #[ORM\Column(length: 255)]
    private ?string $role = null;

    /**
     * Statut d'activation du compte utilisateur
     * true = actif, false = désactivé/suspendu
     */
    #[ORM\Column]
    private ?bool $status = null;

    /**
     * Date de création du compte (RGPD - traçabilité)
     */
    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $createdAt = null;

    /**
     * Date de dernière connexion (sécurité)
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lastLoginAt = null;

    /**
     * Nombre de tentatives de connexion échouées (protection brute force)
     */
    #[ORM\Column(type: 'integer')]
    private int $failedLoginAttempts = 0;

    /**
     * Date de verrouillage du compte après tentatives échouées
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $lockedUntil = null;

    /**
     * Adresse IP de la dernière connexion (sécurité)
     */
    #[ORM\Column(length: 45, nullable: true)]
    private ?string $lastLoginIp = null;

    /**
     * Consentement RGPD (acceptation politique de confidentialité)
     */
    #[ORM\Column(type: 'boolean')]
    private bool $rgpdConsent = false;

    /**
     * Date du consentement RGPD
     */
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $rgpdConsentDate = null;

    /**
     * Token de vérification email (optionnel mais recommandé)
     */
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $emailVerificationToken = null;

    /**
     * Indicateur si l'email est vérifié
     */
    #[ORM\Column(type: 'boolean')]
    private bool $isEmailVerified = false;

    /**
     * Récupère l'identifiant unique de l'utilisateur
     * 
     * @return int|null L'ID de l'utilisateur ou null si non défini
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Récupère le nom de famille de l'utilisateur
     * 
     * @return string|null Le nom de famille ou null
     */
    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    /**
     * Définit le nom de famille de l'utilisateur
     * 
     * @param string $lastname Le nom de famille à définir
     * @return static L'instance courante pour le chaînage
     */
    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Récupère le prénom de l'utilisateur
     * 
     * @return string|null Le prénom ou null
     */
    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    /**
     * Définit le prénom de l'utilisateur
     * 
     * @param string $firstname Le prénom à définir
     * @return static L'instance courante pour le chaînage
     */
    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Récupère l'adresse email de l'utilisateur
     * 
     * @return string|null L'email ou null
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * Définit l'adresse email de l'utilisateur
     * 
     * @param string $email L'email à définir (doit être unique)
     * @return static L'instance courante pour le chaînage
     */
    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Récupère le mot de passe haché de l'utilisateur
     * 
     * @return string|null Le mot de passe haché ou null
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * Définit le mot de passe de l'utilisateur
     * Le mot de passe doit être haché avant d'utiliser cette méthode
     * 
     * @param string $password Le mot de passe haché
     * @return static L'instance courante pour le chaînage
     */
    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Récupère le rôle de l'utilisateur
     * 
     * @return string|null Le rôle (ROLE_USER, ROLE_ADMIN) ou null
     */
    public function getRole(): ?string
    {
        return $this->role;
    }

    /**
     * Définit le rôle de l'utilisateur
     * 
     * @param string $role Le rôle à attribuer (ROLE_USER, ROLE_ADMIN)
     * @return static L'instance courante pour le chaînage
     */
    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    /**
     * Vérifie si le compte utilisateur est actif
     * 
     * @return bool|null true si actif, false si désactivé, null si non défini
     */
    public function isStatus(): ?bool
    {
        return $this->status;
    }

    /**
     * Active ou désactive le compte utilisateur
     * 
     * @param bool $status true pour activer, false pour désactiver
     * @return static L'instance courante pour le chaînage
     */
    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    // ===== IMPLÉMENTATION DE L'INTERFACE UserInterface =====

    /**
     * Retourne les rôles de l'utilisateur pour Symfony Security
     * 
     * @return array<string> Tableau des rôles de l'utilisateur
     */
    public function getRoles(): array
    {
        // Retourne le rôle sous forme de tableau pour Symfony
        return [$this->role];
    }

    /**
     * Retourne le salt pour le hachage du mot de passe
     * Non utilisé avec bcrypt/argon2i (recommandé)
     * 
     * @return string|null null car non nécessaire avec les hashers modernes
     */
    public function getSalt(): ?string
    {
        // Non nécessaire si bcrypt ou argon2i est utilisé pour le hachage
        return null;
    }

    /**
     * Retourne l'identifiant unique pour l'authentification (legacy)
     * Utilisé dans les versions antérieures de Symfony
     * 
     * @return string L'email comme identifiant unique
     */
    public function getUsername(): string
    {
        // Retourne l'email comme identifiant unique
        return $this->email;
    }

    /**
     * Efface les données sensibles après authentification
     * Utilisé pour nettoyer les mots de passe en plain text
     */
    public function eraseCredentials(): void
    {
        // Utilisé pour effacer les données sensibles après authentification
        // Rien à effacer ici car nous ne stockons pas le mot de passe en plain text
    }

    /**
     * Retourne l'identifiant unique pour l'authentification (Symfony 5.3+)
     * Méthode requise par l'interface UserInterface moderne
     * 
     * @return string L'email comme identifiant unique
     */
    public function getUserIdentifier(): string
    {
        // Méthode requise par UserInterface dans Symfony 5.3+
        return $this->email;
    }

    // ===== GETTERS ET SETTERS POUR LES NOUVEAUX CHAMPS =====

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getLastLoginAt(): ?\DateTimeInterface
    {
        return $this->lastLoginAt;
    }

    public function setLastLoginAt(?\DateTimeInterface $lastLoginAt): static
    {
        $this->lastLoginAt = $lastLoginAt;
        return $this;
    }

    public function getFailedLoginAttempts(): int
    {
        return $this->failedLoginAttempts;
    }

    public function setFailedLoginAttempts(int $failedLoginAttempts): static
    {
        $this->failedLoginAttempts = $failedLoginAttempts;
        return $this;
    }

    public function getLockedUntil(): ?\DateTimeInterface
    {
        return $this->lockedUntil;
    }

    public function setLockedUntil(?\DateTimeInterface $lockedUntil): static
    {
        $this->lockedUntil = $lockedUntil;
        return $this;
    }

    public function getLastLoginIp(): ?string
    {
        return $this->lastLoginIp;
    }

    public function setLastLoginIp(?string $lastLoginIp): static
    {
        $this->lastLoginIp = $lastLoginIp;
        return $this;
    }

    public function isRgpdConsent(): bool
    {
        return $this->rgpdConsent;
    }

    public function setRgpdConsent(bool $rgpdConsent): static
    {
        $this->rgpdConsent = $rgpdConsent;
        return $this;
    }

    public function getRgpdConsentDate(): ?\DateTimeInterface
    {
        return $this->rgpdConsentDate;
    }

    public function setRgpdConsentDate(?\DateTimeInterface $rgpdConsentDate): static
    {
        $this->rgpdConsentDate = $rgpdConsentDate;
        return $this;
    }

    public function getEmailVerificationToken(): ?string
    {
        return $this->emailVerificationToken;
    }

    public function setEmailVerificationToken(?string $emailVerificationToken): static
    {
        $this->emailVerificationToken = $emailVerificationToken;
        return $this;
    }

    public function isEmailVerified(): bool
    {
        return $this->isEmailVerified;
    }

    public function setIsEmailVerified(bool $isEmailVerified): static
    {
        $this->isEmailVerified = $isEmailVerified;
        return $this;
    }
}
