<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260619000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajout des champs reset_password_token et reset_password_token_expires_at sur la table users';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE users ADD reset_password_token VARCHAR(255) DEFAULT NULL, ADD reset_password_token_expires_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE users DROP reset_password_token, DROP reset_password_token_expires_at');
    }
}
