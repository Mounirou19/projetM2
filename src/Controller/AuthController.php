<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

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
    public function register(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données
        $constraints = new Assert\Collection([
            'lastName' => [new Assert\NotBlank(), new Assert\Length(['max' => 255])],
            'firstName' => [new Assert\NotBlank(), new Assert\Length(['max' => 255])],
            'email' => [new Assert\NotBlank(), new Assert\Email()],
            'password' => [new Assert\NotBlank(), new Assert\Length(['min' => 8])],
        ]);

        $violations = $validator->validate($data, $constraints);
        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[] = $violation->getMessage();
            }
            return new JsonResponse(['status' => 'error', 'message' => 'Invalid data', 'errors' => $errors], 400);
        }

        // Vérification de l'existence de l'utilisateur
        $u = $this->entityManager->getRepository(Users::class)->findOneBy(['email' => $data['email']]);
        if ($u) {
            return new JsonResponse(['status' => 'error', 'message' => 'Utilisateur déjà existant'], 400);
        }

        // Création de l'utilisateur
        $user = new Users();
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $user->setEmail($data['email']);
        $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hachage sécurisé
        $user->setRole('ROLE_USER');
        $user->setStatus(true);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'success', 'message' => 'Utilisateur créé'], 201);
    }

    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $this->entityManager->getRepository(Users::class)->findOneBy(['email' => $data['email']]);
        if (!$user || !password_verify($data['password'], $user->getPassword())) {
            return new JsonResponse(['status' => 'error', 'message' => 'Invalid credentials'], 403);
        }

        // Générer le token JWT
        $token = $jwtManager->create($user);

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Utilisateur connecté',
            'token' => $token,
            'datas' => [
                'id' => $user->getId(),
                'lastname' => $user->getLastName(),
                'firstname' => $user->getFirstName(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'status' => $user->isStatus(),
                'token' => ($user->getRole() == 'ROLE_ADMIN') ? 'd@t@ventureprojetM2123$' : 'basicToken'
            ],
        ], 200);
    }

    #[Route('/protected', name: 'app_protected', methods: ['GET'])]
    public function protected(): JsonResponse
    {
        return new JsonResponse(['message' => 'Accès autorisé'], 200);
    }
}
