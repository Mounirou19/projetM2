<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Medias;


class MediaController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }


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
