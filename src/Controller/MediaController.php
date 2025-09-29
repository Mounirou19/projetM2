<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Medias;

/**
 * Contrôleur pour la gestion des médias
 * 
 * Ce contrôleur gère toutes les opérations liées aux médias du système CinéManga :
 * - Affichage de la liste complète des médias
 * - Consultation des détails d'un média spécifique
 * 
 * Les médias incluent les films, séries et mangas avec leurs informations
 * complètes (titre, description, score, type, etc.).
 * 
 * @author Mounirou
 * @version 1.0
 */
class MediaController extends AbstractController
{
    /**
     * Gestionnaire d'entités Doctrine pour les opérations base de données
     * 
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Constructeur du contrôleur média
     * 
     * @param EntityManagerInterface $entityManager Gestionnaire d'entités injecté
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Récupérer tous les médias disponibles
     * 
     * Retourne la liste complète de tous les médias présents dans la base
     * avec leurs informations principales pour l'affichage en liste.
     * 
     * @return JsonResponse Liste de tous les médias avec leurs détails
     */
    #[Route('/media', name: 'app_media')]
    public function index(): JsonResponse
    {
        $media = $this->entityManager->getRepository(Medias::class)->findAll();

        $data = [];

        foreach ($media as $m) {
            $data[] = [
                'id' => $m->getId(),
                'title' => $m->getTitle(),
                'type' => $m->getType(),
                'imageUrl' => $m->getImageUrl(),
                'status' => $m->isStatus(),
                'description' => $m->getDescription(),
                'score' => $m->getScore()
            ];
        }

        return new JsonResponse($data, 200);
    }

    #[Route('/media/{id}', name: 'app_media_show')]
    public function show($id): JsonResponse
    {
        $media = $this->entityManager->getRepository(Medias::class)->find($id);

        if (!$media) {
            return new JsonResponse(['error' => 'Media non trouvé'], 404);
        }

        $data[] = [
            'id' => $media->getId(),
            'title' => $media->getTitle(),
            'type' => $media->getType(),
            'imageUrl' => $media->getImageUrl(),
            'description' => $media->getDescription()
        ];

        return new JsonResponse($data, 200);
    }
}
