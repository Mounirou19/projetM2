<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Profils;
use App\Entity\Users;
use App\Entity\Medias;

class ProfilController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/profil', name: 'app_profil')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ProfilController.php',
        ]);
    }

    #[Route('/profil/get/{id}/{media_id}', name: 'app_profil_get')]
    public function getProfil($id, $media_id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $profil = $this->entityManager->getRepository(Profils::class)->findBy(['id_user' => $id, 'id_media' => $media_id]);

        if (!$profil) {
            return new JsonResponse(['error' => 'Profil non trouvé'], 404);
        }

        return new JsonResponse(true, 200);
    }

    #[Route('/profil/create/{id}/{media_id}', name: 'app_profil_create')]
    public function createProfilForUser($id, $media_id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        $profil = new Profils();
        $profil->setIdUser($id);
        $profil->setIdMedia($media_id);

        $this->entityManager->persist($profil);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Profil créé'], 200);
    }

    #[Route('/profil/user/{id}', name: 'app_user_profil')]
    public function getProfilForUser($id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        $profil = $this->entityManager->getRepository(Profils::class)->findBy(['id_user' => $id]);

        if (!$profil) {
            return new JsonResponse(['error' => 'Profil non trouvé'], 404);
        }

        // il y a plusieurs lignes qui peuvent être récupérées
        $datas = [];
        foreach ($profil as $p) {
            $media = $this->entityManager->getRepository(Medias::class)->find($p->getIdMedia());
            $datas[] = [
                'id_profil' => $p->getId(),
                'id' => $media->getId(),
                'title' => $media->getTitle(),
                'type' => $media->getType(),
                'imageUrl' => $media->getImageUrl(),
                'description' => $media->getDescription(),
                'status' => $media->isStatus()
            ];
        }

        return new JsonResponse($datas, 200);
    }

    #[Route('/profil/delete/{id}', name: 'app_profil_delete', methods: ['DELETE'])]
    public function deleteProfilForUser($id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $profil = $this->entityManager->getRepository(Profils::class)->find($id);

        if (!$profil) {
            return new JsonResponse(['error' => 'Profil non trouvé'], 404);
        }

        $this->entityManager->remove($profil);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Profil supprimé'], 200);
    }

    #[Route('/user/profil/{id}', name: 'app_get_user_for_profil')]
    public function getUserForProfil($id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        $datas = [
            'id' => $user->getId(),
            'lastname' => $user->getLastName(),
            'firstname' => $user->getFirstName(),
            'email' => $user->getEmail(),
        ];

        return new JsonResponse($datas, 200);
    }

    #[Route('/delete/profil/{id}', name: 'delete_profil_by_user', methods: ['PUT'])]
    public function deleteProfilByUser($id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        $user->setStatus(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Profil supprimé'], 200);
    }

    #[Route('/profil/user/edit/{id}', name: 'app_profil_user_edit', methods: ['PUT'])]
    public function editUserForProfil($id, Request $request): JsonResponse
    {
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('R0L3_US3R' == $d[0])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
        }

        $datas = json_decode($request->getContent(), true);

        $user->setLastName($datas['lastname']);
        $user->setFirstName($datas['firstname']);
        $user->setEmail($datas['email']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur modifié'], 200);
    }



    // Recuperer les medias d'un utilisateur
    // #[Route('/profil/user/{id}/media', name: 'app_media_profil')] 
    // public function getMediasForUser($id): JsonResponse
    // {
    //     $data = $request->query->get('infos');
    //     $d = explode(',', $data);

    //     if (!isset($d[0])) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     } else if (!('R0L3_US3R' == $d[0]) || !('R0L3_@DM1N' == $d[0]) ) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     }

    //     $user = $this->entityManager->getRepository(Users::class)->find($id);

    //     if (!$user) {
    //         return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
    //     }

    //     $profil = $this->entityManager->getRepository(Profils::class)->findOneBy(['user_id' => $id]);

    //     if (!$profil) {
    //         return new JsonResponse(['error' => 'Profil non trouvé'], 404);
    //     }

    //     $datas = [];
    
    //     // boucle pour recuperer les medias en fonction de l'id du profil
    //     foreach ($profil as $p) {
    //         $media = $this->entityManager->getRepository(Medias::class)->find($p->getMediaId());
    //         $datas[] = [
    //             'id' => $media->getId(),
    //             'title' => $media->getTitle(),
    //             'type' => $media->getType(),
    //             'description' => $media->getDescription(),
    //             'status' => $media->isStatus()
    //         ];
    //     }

    //     return new JsonResponse($datas, 200);
    // }
}
