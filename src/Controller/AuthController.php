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
use Psr\Log\LoggerInterface;

/**
 * Contrôleur d'authentification sécurisé conforme RGPD
 * 
 * Fonctionnalités de sécurité :
 * - Protection contre le brute force (rate limiting)
 * - Verrouillage automatique après tentatives échouées
 * - Traçabilité des connexions (IP, date)
 * - Consentement RGPD obligatoire
 * - Validation stricte des données
 * 
 * @author Mounirou
 * @version 2.0 - Sécurité renforcée et conformité RGPD
 */
class AuthController extends AbstractController
{
    private const MAX_LOGIN_ATTEMPTS = 5;
    private const LOCKOUT_DURATION_MINUTES = 15;
    
    private EntityManagerInterface $entityManager;
    private LoggerInterface $logger;

    /**
     * Constructeur - Injection de dépendances
     * 
     * @param EntityManagerInterface $entityManager Manager pour les opérations BDD
     * @param LoggerInterface $logger Logger pour l'audit de sécurité
     */
    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }


    /**
     * Inscription avec consentement RGPD obligatoire
     * 
     * @param Request $request Requête HTTP contenant les données d'inscription
     * @param ValidatorInterface $validator Service de validation Symfony
     * @return JsonResponse Réponse JSON avec le statut de l'inscription
     */
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $clientIp = $request->getClientIp();

        // Validation des données avec consentement RGPD obligatoire
        $constraints = new Assert\Collection([
            'lastName' => [
                new Assert\NotBlank(['message' => 'Le nom est requis']),
                new Assert\Length(['max' => 255, 'maxMessage' => 'Le nom ne peut dépasser 255 caractères'])
            ],
            'firstName' => [
                new Assert\NotBlank(['message' => 'Le prénom est requis']),
                new Assert\Length(['max' => 255, 'maxMessage' => 'Le prénom ne peut dépasser 255 caractères'])
            ],
            'email' => [
                new Assert\NotBlank(['message' => 'L\'email est requis']),
                new Assert\Email(['message' => 'L\'email doit être valide'])
            ],
            'password' => [
                new Assert\NotBlank(['message' => 'Le mot de passe est requis']),
                new Assert\Length([
                    'min' => 8,
                    'minMessage' => 'Le mot de passe doit contenir au moins 8 caractères'
                ]),
                new Assert\Regex([
                    'pattern' => '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/',
                    'message' => 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
                ])
            ],
            'rgpdConsent' => [
                new Assert\NotNull(['message' => 'Le consentement RGPD est requis']),
                new Assert\IsTrue(['message' => 'Vous devez accepter la politique de confidentialité'])
            ]
        ]);

        $violations = $validator->validate($data, $constraints);
        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[$violation->getPropertyPath()] = $violation->getMessage();
            }
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Données invalides',
                'errors' => $errors
            ], 400);
        }

        // Vérification de l'existence de l'utilisateur
        $existingUser = $this->entityManager->getRepository(Users::class)
            ->findOneBy(['email' => $data['email']]);
            
        if ($existingUser) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Cette adresse email est déjà utilisée'
            ], 409);
        }

        // Création de l'utilisateur avec données RGPD
        $user = new Users();
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $user->setEmail($data['email']);
        $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT, ['cost' => 12]));
        $user->setRole('ROLE_USER');
        $user->setStatus(true);
        $user->setCreatedAt(new \DateTime());
        $user->setRgpdConsent(true);
        $user->setRgpdConsentDate(new \DateTime());
        $user->setFailedLoginAttempts(0);
        
        // Génération d'un token de vérification email (optionnel)
        $user->setEmailVerificationToken(bin2hex(random_bytes(32)));
        $user->setIsEmailVerified(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Log d'audit RGPD
        $this->logAuditEvent('USER_REGISTERED', $user->getId(), $clientIp);

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Compte créé avec succès. Bienvenue !',
            'data' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'emailVerificationRequired' => !$user->isEmailVerified()
            ]
        ], 201);
    }


    /**
     * Connexion sécurisée avec protection brute force
     * 
     * @param Request $request Requête HTTP contenant les credentials
     * @param JWTTokenManagerInterface $jwtManager Service de génération JWT
     * @return JsonResponse Réponse JSON avec le token ou l'erreur
     */
    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $clientIp = $request->getClientIp();

        // Validation des données d'entrée
        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Email et mot de passe requis'
            ], 400);
        }

        // Vérification du captcha (Google reCAPTCHA v2)
        if (empty($data['captchaToken'])) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Veuillez valider le captcha'
            ], 400);
        }

        $captchaValid = $this->verifyCaptcha($data['captchaToken'], $clientIp);
        if (!$captchaValid) {
            $this->logAuditEvent('LOGIN_FAILED_CAPTCHA_INVALID', null, $clientIp, $data['email']);
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Captcha invalide. Veuillez réessayer.'
            ], 403);
        }

        // Récupération de l'utilisateur
        $user = $this->entityManager->getRepository(Users::class)
            ->findOneBy(['email' => $data['email']]);

        // Vérification si le compte existe et est actif
        if (!$user) {
            $this->logAuditEvent('LOGIN_FAILED_USER_NOT_FOUND', null, $clientIp, $data['email']);
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Identifiants invalides'
            ], 403);
        }

        if (!$user->isStatus()) {
            $this->logAuditEvent('LOGIN_FAILED_ACCOUNT_DISABLED', $user->getId(), $clientIp);
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Votre compte a été désactivé. Contactez l\'administrateur.'
            ], 403);
        }

        // Vérification du verrouillage temporaire
        if ($this->isAccountLocked($user)) {
            $remainingTime = $this->getRemainingLockoutTime($user);
            return new JsonResponse([
                'status' => 'error',
                'message' => "Compte temporairement verrouillé suite à de multiples tentatives échouées. Réessayez dans {$remainingTime} minutes.",
                'lockedUntil' => $user->getLockedUntil()->format('Y-m-d H:i:s')
            ], 429);
        }

        // Vérification du mot de passe
        if (!password_verify($data['password'], $user->getPassword())) {
            $this->handleFailedLogin($user, $clientIp);
            
            $remainingAttempts = self::MAX_LOGIN_ATTEMPTS - $user->getFailedLoginAttempts();
            
            if ($remainingAttempts <= 0) {
                return new JsonResponse([
                    'status' => 'error',
                    'message' => 'Trop de tentatives échouées. Votre compte a été verrouillé pendant ' . self::LOCKOUT_DURATION_MINUTES . ' minutes.'
                ], 429);
            }
            
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Identifiants invalides',
                'remainingAttempts' => $remainingAttempts
            ], 403);
        }

        // Connexion réussie - Réinitialisation des tentatives échouées
        $this->handleSuccessfulLogin($user, $clientIp);

        // Génération du token JWT
        $token = $jwtManager->create($user);

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Connexion réussie',
            'token' => $token,
            'datas' => [
                'id' => $user->getId(),
                'lastname' => $user->getLastName(),
                'firstname' => $user->getFirstName(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'status' => $user->isStatus(),
                'lastLoginAt' => $user->getLastLoginAt()?->format('Y-m-d H:i:s'),
                'rgpdConsent' => $user->isRgpdConsent(),
                'emailVerified' => $user->isEmailVerified(),
                'token' => ($user->getRole() == 'ROLE_ADMIN') ? 'd@t@ventureprojetM2123$' : 'basicToken'
            ]
        ], 200);
    }

    /**
     * Vérification si le compte est verrouillé
     * 
     * @param Users $user L'utilisateur à vérifier
     * @return bool true si le compte est verrouillé
     */
    private function isAccountLocked(Users $user): bool
    {
        if ($user->getLockedUntil() === null) {
            return false;
        }

        $now = new \DateTime();
        if ($now < $user->getLockedUntil()) {
            return true;
        }

        // Déverrouillage automatique si le délai est passé
        $user->setLockedUntil(null);
        $user->setFailedLoginAttempts(0);
        $this->entityManager->flush();

        return false;
    }

    /**
     * Calcul du temps restant de verrouillage
     * 
     * @param Users $user L'utilisateur
     * @return int Nombre de minutes restantes
     */
    private function getRemainingLockoutTime(Users $user): int
    {
        $now = new \DateTime();
        $lockedUntil = $user->getLockedUntil();
        
        if ($lockedUntil === null) {
            return 0;
        }

        $diff = $now->diff($lockedUntil);
        return $diff->i + ($diff->h * 60); // Minutes restantes
    }

    /**
     * Gestion d'une tentative de connexion échouée
     * 
     * @param Users $user L'utilisateur
     * @param string $clientIp L'IP du client
     */
    private function handleFailedLogin(Users $user, string $clientIp): void
    {
        $attempts = $user->getFailedLoginAttempts() + 1;
        $user->setFailedLoginAttempts($attempts);

        // Verrouillage si trop de tentatives
        if ($attempts >= self::MAX_LOGIN_ATTEMPTS) {
            $lockoutTime = new \DateTime();
            $lockoutTime->modify('+' . self::LOCKOUT_DURATION_MINUTES . ' minutes');
            $user->setLockedUntil($lockoutTime);
            
            $this->logAuditEvent('ACCOUNT_LOCKED', $user->getId(), $clientIp);
        }

        $this->entityManager->flush();
        $this->logAuditEvent('LOGIN_FAILED', $user->getId(), $clientIp);
    }

    /**
     * Gestion d'une connexion réussie
     * 
     * @param Users $user L'utilisateur
     * @param string $clientIp L'IP du client
     */
    private function handleSuccessfulLogin(Users $user, string $clientIp): void
    {
        $user->setFailedLoginAttempts(0);
        $user->setLockedUntil(null);
        $user->setLastLoginAt(new \DateTime());
        $user->setLastLoginIp($clientIp);

        $this->entityManager->flush();
        $this->logAuditEvent('LOGIN_SUCCESS', $user->getId(), $clientIp);
    }

    /**
     * Logging des événements d'audit (RGPD - traçabilité)
     * 
     * @param string $eventType Type d'événement
     * @param int|null $userId ID de l'utilisateur concerné
     * @param string $ip Adresse IP
     * @param string|null $email Email (optionnel)
     */
    private function logAuditEvent(string $eventType, ?int $userId, string $ip, ?string $email = null): void
    {
        $this->logger->info($eventType, [
            'user_id' => $userId,
            'ip' => $ip,
            'email' => $email,
            'timestamp' => (new \DateTime())->format('Y-m-d H:i:s')
        ]);
    }

    /**
     * Endpoint pour révocation du consentement RGPD
     * 
     * @param Request $request Requête HTTP
     * @return JsonResponse Réponse JSON
     */
    #[Route('/rgpd/revoke-consent', name: 'app_rgpd_revoke', methods: ['POST'])]
    public function revokeRgpdConsent(Request $request): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Non authentifié'], 401);
        }

        $user->setRgpdConsent(false);
        $user->setStatus(false); // Désactivation du compte
        
        $this->entityManager->flush();
        $this->logAuditEvent('RGPD_CONSENT_REVOKED', $user->getId(), $request->getClientIp());

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Consentement révoqué. Votre compte a été désactivé.'
        ], 200);
    }

    /**
     * Endpoint pour demande de suppression des données (RGPD - Droit à l'oubli)
     * 
     * @param Request $request Requête HTTP
     * @return JsonResponse Réponse JSON
     */
    #[Route('/rgpd/delete-account', name: 'app_rgpd_delete', methods: ['DELETE'])]
    public function deleteAccount(Request $request): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return new JsonResponse(['status' => 'error', 'message' => 'Non authentifié'], 401);
        }

        $userId = $user->getId();
        $userEmail = $user->getEmail();

        // Anonymisation avant suppression (alternative à la suppression complète)
        $user->setEmail('deleted_' . $userId . '@deleted.local');
        $user->setLastName('DELETED');
        $user->setFirstName('USER');
        $user->setStatus(false);
        $user->setPassword('DELETED');
        
        $this->entityManager->flush();
        $this->logAuditEvent('ACCOUNT_DELETED_RGPD', $userId, $request->getClientIp(), $userEmail);

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Votre compte a été supprimé conformément au RGPD.'
        ], 200);
    }

    /**
     * Route protégée de test
     * 
     * @return JsonResponse Réponse JSON
     */
    #[Route('/protected', name: 'app_protected', methods: ['GET'])]
    public function protected(): JsonResponse
    {
        return new JsonResponse(['message' => 'Accès autorisé'], 200);
    }

    /**
     * Vérification du captcha Google reCAPTCHA v2
     * 
     * @param string $token Token reCAPTCHA du client
     * @param string $clientIp IP du client
     * @return bool true si le captcha est valide
     */
    private function verifyCaptcha(string $token, string $clientIp): bool
    {
        $secretKey = $_ENV['RECAPTCHA_SECRET_KEY'] ?? '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'; // Clé de test par défaut
        
        $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        
        $data = [
            'secret' => $secretKey,
            'response' => $token,
            'remoteip' => $clientIp
        ];

        // Appel à l'API Google reCAPTCHA
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ]
        ];
        
        $context = stream_context_create($options);
        $response = @file_get_contents($verifyUrl, false, $context);
        
        if ($response === false) {
            $this->logger->error('CAPTCHA_VERIFICATION_FAILED', [
                'error' => 'Unable to connect to reCAPTCHA API'
            ]);
            return false;
        }

        $responseData = json_decode($response, true);
        
        // Log du résultat pour audit
        if (!$responseData['success']) {
            $this->logger->warning('CAPTCHA_VALIDATION_FAILED', [
                'error_codes' => $responseData['error-codes'] ?? [],
                'client_ip' => $clientIp
            ]);
        }

        return $responseData['success'] ?? false;
    }
}
