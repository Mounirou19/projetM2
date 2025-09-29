<?php

namespace App\Command;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

/**
 * Commande de création d'un utilisateur administrateur
 * 
 * Cette commande console permet de créer facilement un compte administrateur
 * pour le système CinéManga. Elle guide l'utilisateur dans la saisie des
 * informations requises et crée automatiquement un utilisateur avec le rôle ROLE_ADMIN.
 * 
 * Utilisation : php bin/console app:create-admin
 * 
 * La commande vérifie l'unicité de l'email, hash le mot de passe de façon sécurisée
 * et active automatiquement le compte administrateur créé.
 * 
 * @author Mounirou
 * @version 1.0
 */
#[AsCommand(name: 'app:create-admin', description: 'Crée un utilisateur administrateur')]
class CreateAdminCommand extends Command
{
    /**
     * Gestionnaire d'entités Doctrine pour les opérations base de données
     * 
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * Constructeur de la commande
     * 
     * @param EntityManagerInterface $entityManager Gestionnaire d'entités injecté
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $lastName = $io->ask('Nom de l\'administrateur');
        $firstName = $io->ask('Prénom de l\'administrateur');
        $email = $io->ask('Email de l\'administrateur');
        $password = $io->askHidden('Mot de passe de l\'administrateur');

        $existingUser = $this->entityManager->getRepository(Users::class)->findOneBy(['email' => $email]);
        if ($existingUser) {
            $io->error('Un utilisateur avec cet email existe déjà.');
            return Command::FAILURE;
        }

        $admin = new Users();
        $admin->setLastName($lastName);
        $admin->setFirstName($firstName);
        $admin->setEmail($email);
        $admin->setPassword(password_hash($password, PASSWORD_BCRYPT));
        $admin->setRole('ROLE_ADMIN');
        $admin->setStatus(true);

        $this->entityManager->persist($admin);
        $this->entityManager->flush();

        $io->success('Administrateur créé avec succès !');
        return Command::SUCCESS;
    }
}
