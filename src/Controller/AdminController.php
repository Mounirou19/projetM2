<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Users;
use App\Entity\Medias;
use App\Entity\Profils;
use App\Entity\Contacts;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Contrôleur d'administration du système CinéManga
 * 
 * Ce contrôleur gère toutes les fonctionnalités d'administration du site :
 * - Tableau de bord avec statistiques et données globales
 * - Gestion CRUD complète des médias (films, séries, mangas)
 * - Gestion des utilisateurs et de leurs profils
 * - Consultation et gestion des messages de contact
 * - Système d'autorisation avec token admin et vérifications multiples
 * 
 * Sécurité :
 * - Double vérification : token admin ET paramètres de requête
 * - Contrôle des rôles utilisateurs
 * - Protection contre les accès non autorisés
 * 
 * Ce contrôleur est le cœur de l'interface d'administration et contient
 * toutes les opérations sensibles nécessitant des privilèges élevés.
 * 
 * @author Mounirou
 * @version 1.0
 */
class AdminController extends AbstractController
{
    /**
     * Gestionnaire d'entités Doctrine pour les opérations base de données
     * 
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Vérifier l'autorisation d'accès administrateur
     * 
     * Vérifie la présence et la validité du token d'administration
     * dans les en-têtes de la requête HTTP.
     * 
     * @param Request $request Requête HTTP à vérifier
     * @return bool true si autorisé, false sinon
     */
    private function isAuthorized(Request $request): bool
    {
        $token = $request->headers->get('X-ADMIN-TOKEN');
        return $token === $_ENV['ADMIN_ACCESS_TOKEN'];
    }

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/admin', name: 'app_admin')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AdminController.php',
        ]);
    }

    #[Route('/admin/board', name: 'app_board')]
    public function dashboard(Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $users = $this->entityManager->getRepository(Users::class)->findAll();
        $medias = $this->entityManager->getRepository(Medias::class)->findAll();
        $profils = $this->entityManager->getRepository(Profils::class)->findAll();
        $contacts = $this->entityManager->getRepository(Contacts::class)->findAll();

        $data_users = [];
        $data_medias = [];
        $data_profils = [];
        $data_contacts = [];

        foreach ($users as $user) {
            $data_users[] = [
                'id' => $user->getId(),
                'lastname' => $user->getLastName(),
                'firstname' => $user->getFirstName(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'status' => $user->isStatus()
            ];
        }

        foreach ($medias as $media) {
            $data_medias[] = [
                'id' => $media->getId(),
                'title' => $media->getTitle(),
                'description' => $media->getDescription(),
                'type' => $media->getType(),
                'imageUrl' => $media->getImageUrl(),
                'status' => $media->isStatus(),
                'score' => $media->getScore()
            ];
        }

        foreach ($profils as $profil) {
            $data_profils[] = [
                'id' => $profil->getId(),
                'id_user' => $profil->getIdUser(),
                'id_media' => $profil->getIdMedia(),
            ];
        }

        foreach ($contacts as $contact) {
            $data_contacts[] = [
                'id' => $contact->getId(),
                'name' => $contact->getName(),
                'email' => $contact->getEmail(),
                'subject' => $contact->getSubject(),
                'message' => $contact->getMessage(),
                'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
                'status' => $contact->isStatus()
            ];
        }

        return new JsonResponse([
            'status' => 'succes',
            'message' => 'Tableau de bord',
            'data' => [
                'users' => $data_users,
                'medias' => $data_medias,
                'profils' => $data_profils,
                'contacts' => $data_contacts
            ]
        ], 200);
    }

    #[Route ('/admin/medias', name: 'app_admin_medias_get')]
    public function getMedias(Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0]) || !isset($d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $medias = $this->entityManager->getRepository(Medias::class)->findAll();

        $datas = [];

        foreach ($medias as $media) {
            $datas[] = [
                'id' => $media->getId(),
                'title' => $media->getTitle(),
                'type' => $media->getType(),
                'imageUrl' => $media->getImageUrl(),
                'description' => $media->getDescription(),
                'status' => $media->isStatus(),
                'score' => $media->getScore()
            ];
        }

        return new JsonResponse($datas, 200);
    }

    #[Route('/admin/user/create', name: 'app_create_user', methods: ['POST'])]
    public function createUser(Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $user = new Users();
        $user->setLastName($data['lastname']);
        $user->setFirstName($data['firstname']);
        $user->setEmail($data['email']);
        $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT));
        $user->setRole($data['role']);
        $user->setStatus(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur créé'], 200);
    }

    #[Route('/admin/media/create', name: 'app_create_media', methods: ['POST'])]
    public function createMedia(Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $m = $this->entityManager->getRepository(Medias::class)->findOneBy(['title' => $data['title']]);

        if ($m) {
            return new JsonResponse(['status' => 'error', 'message' => 'Média déjà existant'], 404);
        }

        $media = new Medias();
        $media->setTitle($data['title']);
        $media->setDescription($data['description']);
        $media->setType($data['type']);
        $media->setImageUrl($data['imageUrl']);
        $media->setStatus(true);
        $media->setScore(0);

        $this->entityManager->persist($media);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Média créé'], 200);
    }

    #[Route('/admin/user/{id}', name: 'app_get_user', methods: ['GET'])]
    public function getUserr($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur non trouvé'], 404);
        }

        $data = [
            'id' => $user->getId(),
            'lastname' => $user->getLastName(),
            'firstname' => $user->getFirstName(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
            'status' => $user->isStatus()
        ];

        return new JsonResponse($data, 200);
    }

    #[Route('/admin/media/{id}', name: 'app_get_media', methods: ['GET'])]
    public function getMedia($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $media = $this->entityManager->getRepository(Medias::class)->find($id);

        if (!$media) {
            return new JsonResponse(['status' => 'error', 'message' => 'Média non trouvé'], 404);
        }

        $data = [
            'id' => $media->getId(),
            'title' => $media->getTitle(),
            'description' => $media->getDescription(),
            'type' => $media->getType(),
            'imageUrl' => $media->getImageUrl(),
            'status' => $media->isStatus(),
            'score' => $media->getScore()
        ];

        return new JsonResponse($data, 200);
    }

    #[Route('/admin/user/delete/{id}', name: 'app_delete_user', methods: ['PUT'])]
    public function deleteUser($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur non trouvé'], 404);
        }

        $user->setStatus(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // $this->entityManager->remove($user);
        // $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur supprimé'], 200);
    }

    #[Route('/admin/user/deletever/{id}', name: 'app_deletever_user', methods: ['DELETE'])]
    public function deleteUseForEver($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur non trouvé'], 404);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur supprimé'], 200);
    }

    #[Route('/admin/user/reactivate/{id}', name: 'app_reactivate_user', methods: ['PUT'])]
    public function reactivateUser($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur non trouvé'], 404);
        }

        $user->setStatus(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur réactivé'], 200);
    }

    #[Route('/admin/media/delete/{id}', name: 'app_delete_media', methods: ['PUT'])]
    public function deleteMedia($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $media = $this->entityManager->getRepository(Medias::class)->find($id);

        if (!$media) {
            return new JsonResponse(['status' => 'error', 'message' => 'Média non trouvé'], 404);
        }

        $media->setStatus(false);

        $this->entityManager->persist($media);
        $this->entityManager->flush();

        // $this->entityManager->remove($media);
        // $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Média supprimé'], 200);
    }

    #[Route('/admin/media/reactivate/{id}', name: 'app_reactivate_media', methods: ['PUT'])]
    public function reactivateMedia($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $media = $this->entityManager->getRepository(Medias::class)->find($id);

        if (!$media) {
            return new JsonResponse(['status' => 'error', 'message' => 'Média non trouvé'], 404);
        }

        $media->setStatus(true);

        $this->entityManager->persist($media);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Média réactivé'], 200);
    }

    #[Route('/admin/user/update/{id}', name: 'app_update_user', methods: ['PUT'])]
    public function updateUser($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $user = $this->entityManager->getRepository(Users::class)->find($id);

        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur non trouvé'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $user->setLastName($data['lastname']);
        $user->setFirstName($data['firstname']);
        $user->setEmail($data['email']);
        $user->setRole($data['role']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur modifié'], 200);
    }

    #[Route('/admin/media/update/{id}', name: 'app_update_media', methods: ['PUT'])]
    public function updateMedia($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if(!isset($d[0]) || !isset($d[1])){
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $media = $this->entityManager->getRepository(Medias::class)->find($id);

        if (!$media) {
            return new JsonResponse(['status' => 'error', 'message' => 'Média non trouvé'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $media->setTitle($data['title']);
        $media->setDescription($data['description']);
        $media->setImageUrl($data['imageUrl']);
        $media->setType($data['type']);

        $this->entityManager->persist($media);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Média modifié'], 200);
    }

    #[Route('/admin/contact/{id}', name: 'app_get_contact', methods: ['GET'])]
    public function getContact($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0]) || !isset($d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $contact = $this->entityManager->getRepository(Contacts::class)->find($id);

        if (!$contact) {
            return new JsonResponse(['status' => 'error', 'message' => 'Contact non trouvé'], 404);
        }

        $data = [
            'id' => $contact->getId(),
            'name' => $contact->getName(),
            'email' => $contact->getEmail(),
            'subject' => $contact->getSubject(),
            'message' => $contact->getMessage(),
            'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
            'status' => $contact->isStatus()
        ];

        return new JsonResponse($data, 200);
    }

    #[Route('/admin/contact/lu/{id}', name: 'app_contact_lu', methods: ['PUT'])]
    public function contactLu($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0]) || !isset($d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $contact = $this->entityManager->getRepository(Contacts::class)->find($id);

        if (!$contact) {
            return new JsonResponse(['status' => 'error', 'message' => 'Contact non trouvé'], 404);
        }

        $contact->setStatus(false);

        $this->entityManager->persist($contact);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Contact lu'], 200);
    }

    #[Route('/admin/contact/delete/{id}', name: 'app_delete_contact', methods: ['DELETE'])]
    public function deleteContact($id, Request $request): JsonResponse
    {
        if (!$this->isAuthorized($request)) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }
        
        $data = $request->query->get('infos');
        $d = explode(',', $data);

        if (!isset($d[0]) || !isset($d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        } else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
            return new JsonResponse(['error' => 'Accès interdit'], 403);
        }

        $contact = $this->entityManager->getRepository(Contacts::class)->find($id);

        if (!$contact) {
            return new JsonResponse(['status' => 'error', 'message' => 'Contact non trouvé'], 404);
        }

        $this->entityManager->remove($contact);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Contact supprimé'], 200);
    }

    // #[Route('/admin/profil/create/{id}/{media_id}', name: 'app_create_profil', methods: ['POST'])]
    // public function createProfilForUser($id, $media_id, Request $request): JsonResponse
    // {
    //     $data = $request->query->get('infos');
    //     $d = explode(',', $data);

    //     if (!isset($d[0]) || !isset($d[1])) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     } else if (!('ROLE_ADMIN' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     }

    //     $user = $this->entityManager->getRepository(Users::class)->find($id);
    //     $media = $this->entityManager->getRepository(Medias::class)->find($media_id);

    //     if (!$user || $user->isStatus() == false) {
    //         return new JsonResponse(['error' => 'Utilisateur non trouvé'], 404);
    //     }
    //     if (!$media || $media->isStatus() == false) {
    //         return new JsonResponse(['error' => 'Média non trouvé'], 404);
    //     }

    //     $p = $this->entityManager->getRepository(Profils::class)->findOneBy(['id_user' => $id, 'id_media' => $media_id]);
    //     if ($p) {
    //         return new JsonResponse(['error' => 'Profil déjà créé'], 403);
    //     }

    //     $profil = new Profils();
    //     $profil->setIdUser($id);
    //     $profil->setIdMedia($media_id);

    //     $this->entityManager->persist($profil);
    //     $this->entityManager->flush();

    //     return new JsonResponse(['status' => 'succes', 'message' => 'Profil créé'], 200);
    // }
}
