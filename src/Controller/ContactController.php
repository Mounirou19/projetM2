<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Contacts;

/**
 * Contrôleur pour la gestion des messages de contact
 * 
 * Ce contrôleur gère le système de contact du site CinéManga :
 * - Création de nouveaux messages de contact depuis le formulaire public
 * - Gestion des notifications de nouveaux messages
 * - Système de logging des contacts reçus
 * 
 * Le contrôleur permet aux visiteurs (anonymes) d'envoyer des messages
 * sans authentification requise. Les messages sont sauvegardés en base
 * et des notifications sont générées pour l'équipe administrative.
 * 
 * @author Mounirou
 * @version 1.0
 */
class ContactController extends AbstractController
{
    /**
     * Gestionnaire d'entités Doctrine pour les opérations base de données
     * 
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Constructeur du contrôleur contact
     * 
     * @param EntityManagerInterface $entityManager Gestionnaire d'entités injecté
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    // #[Route('/contact', name: 'app_contact_get')]
    // public function getContacts(): JsonResponse
    // {
    //     $data = $request->query->get('infos');
    //     $d = explode(',', $data);

    //     if (!isset($d[0]) || !isset($d[1])) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     } else if (!('R0L3_@DM1N' == $d[0]) && !('d@t@ventureprojetM2123$' == $d[1])) {
    //         return new JsonResponse(['error' => 'Accès interdit'], 403);
    //     }

    //     $contacts = $this->entityManager->getRepository(Contacts::class)->findAll();

    //     $datas = [];
    //     foreach ($contacts as $contact) {
    //         $datas[] = [
    //             'id' => $contact->getId(),
    //             'name' => $contact->getName(),
    //             'email' => $contact->getEmail(),
    //             'subject' => $contact->getSubject(),
    //             'message' => $contact->getMessage(),
    //             'createdAt' => $contact->getCreatedAt()->format('Y-m-d H:i:s'),
    //             'status' => $contact->isStatus()
    //         ];
    //     }

    //     return new JsonResponse(['data' => $datas]);

    // }

    #[Route('/contact/create', name: 'app_contact_create', methods: ['POST'])]
    public function createContact(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // var_dump($data);
        // exit;

        $name = $data['name'];
        $email = $data['email'];
        $subject = $data['subject'];
        $message = $data['message'];
        $createdAt = new \DateTimeImmutable('now');
        $status = true;

        if (empty($name) || empty($email) || empty($subject) || empty($message) || empty($createdAt) || empty($status)) {
            return new JsonResponse(['error' => 'Tous les champs sont requis'], 400);
        }

        $contact = new Contacts();
        $contact->setName($name);
        $contact->setEmail($email);
        $contact->setSubject($subject);
        $contact->setMessage($message);
        $contact->setCreatedAt($createdAt);
        $contact->setStatus($status);

        $this->entityManager->persist($contact);
        $this->entityManager->flush();

        // Écrire une notification dans le fichier log
        $racine = $_SERVER['DOCUMENT_ROOT'];
        // je veux supprimer public de la racine
        $racine = str_replace('public', '', $racine);
        $filePath = $racine . 'notifications.log';
        $logMessage = "Nouveau message de $name à " . date('Y-m-d H:i:s') . "\n";
        file_put_contents($filePath, $logMessage, FILE_APPEND);

        return new JsonResponse(['status' => 'Contact créé!'], 201);
    }
}
