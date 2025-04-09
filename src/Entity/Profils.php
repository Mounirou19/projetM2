<?php

namespace App\Entity;

use App\Repository\ProfilsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProfilsRepository::class)]
class Profils
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $id_user = null;

    #[ORM\Column]
    private ?int $id_media = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }

    public function setIdUser(int $id_user): static
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getIdMedia(): ?int
    {
        return $this->id_media;
    }

    public function setIdMedia(int $id_media): static
    {
        $this->id_media = $id_media;

        return $this;
    }
}
