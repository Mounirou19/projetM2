<?php

namespace App\Command;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:create-admin', description: 'Crée un utilisateur administrateur')]
class CreateAdminCommand extends Command
{
    private $entityManager;

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
