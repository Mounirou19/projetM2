<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class AuthController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/auth', name: 'app_auth')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AuthController.php',
        ]);
    }

    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $u = $this->entityManager->getRepository(Users::class)->findOneBy(['email' => $data['email']]);
        if ($u) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur déjà existant'], 404);
        }

        $user = new Users();
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $user->setEmail($data['email']);
        $user->setPassword(md5($data['password']));
        $user->setRole('R0L3_US3R');
        $user->setStatus(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur créer'], 200);
    }

    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // var_dump(1);
        // var_dump($data);
        // exit;
        $user = $this->entityManager->getRepository(Users::class)->findOneBy(['email' => $data['email']]);
        
        if (!$user) {
                return new JsonResponse(['status' => 'error', 'message' => 'noUser'], 404);
        }else if ( md5($data['password']) != $user->getPassword()){
            return new JsonResponse(['status' => 'error', 'message' => 'badPassword'], 404);
        }

        // infos de l'user dans un tableau
        $infos = [
            'id' => $user->getId(),
            'lastname' => $user->getLastName(),
            'firstname' => $user->getFirstName(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
            'status' => $user->isStatus(),
            'token' => ($user->getRole() == 'R0L3_@DM1N') ? 'd@t@ventureprojetM2123$' : 'basicToken'
        ];

        return new JsonResponse(['status' => 'succes', 'message' => 'Utilisateur connecté', 'datas' => $infos], 200);
    }


}
